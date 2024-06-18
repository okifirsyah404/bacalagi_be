import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { fileFromPath } from 'formdata-node/file-from-path';

@Injectable()
export class HttpHandlerService {
  constructor(private readonly httpService: HttpService) {}

  async sendDataToModel(data: { imagePath: string; purchasePrice: number }) {
    // const imageFile = fs.readFileSync(data.imagePath);

    const form = new FormData();

    form.append('file', await fileFromPath(data.imagePath));
    form.append('purchase_price', data.purchasePrice.toString());

    const response = await this.httpService
      .axiosRef(`${process.env.FAST_API_HOST}/predict-image`, {
        method: 'POST',
        data: form,
      })
      .catch((error) => {
        throw error;
      });

    const responseData = {
      wornOut: response.data.Wornout,
      ripped: response.data.Ripped,
      wornOutRatio: response.data.Rasio_Wornout,
      rippedRatio: response.data.Rasio_Ripped,
      overallRatio: response.data.Overall_Ratio,
      recommendedPrice: response.data.Recommended_Price,
    };

    return responseData;
  }
}
