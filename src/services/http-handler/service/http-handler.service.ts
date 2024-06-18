import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import * as FormData from 'form-data';

@Injectable()
export class HttpHandlerService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Sends an image and purchase price to the model for prediction.
   * @param postId - The ID of the post.
   * @param purchasePrice - The purchase price of the item.
   * @returns A promise that resolves to the model's prediction response.
   */
  async sendImageToModel(postId: string, purchasePrice: number): Promise<any> {
    const formData = new FormData();
    const imagePath = `${process.cwd()}/public/image/post/${postId}.png`;

    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found at path: ${imagePath}`);
    }

    formData.append('file', fs.createReadStream(imagePath));
    formData.append('purchase_price', purchasePrice.toString());

    try {
      const response = await this.httpService.axiosRef({
        url: 'http://localhost:8000/predict-image',
        method: 'POST',
        headers: formData.getHeaders(),
        data: formData,
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to send image to model: ${error}`);
    }
  }
}
