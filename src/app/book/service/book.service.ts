import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import * as FormData from 'form-data';

@Injectable()
export class BookService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Sends an image and purchase price to the model for prediction.
   * @param filePath - The path of the image file.
   * @param purchasePrice - The purchase price of the item.
   * @returns A promise that resolves to the model's prediction response.
   */
  async sendImageToModel(
    filePath: string,
    purchasePrice: number,
  ): Promise<any> {
    const formData = new FormData();

    if (!fs.existsSync(filePath)) {
      throw new HttpException(
        `Image file not found at path: ${filePath}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    formData.append('file', fs.createReadStream(filePath));
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
      if (error instanceof Error) {
        throw new HttpException(
          `Failed to send image to model: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Failed to send image to model: Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
