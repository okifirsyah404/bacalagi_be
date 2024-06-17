import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpHandlerService {
  // const toModel1 = await this.httpService.axiosRef(
  //     'http://localhost:3000/detect-image',
  //     {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //       data: {
  //         file: fs.createReadStream(
  //           `${process.cwd()}/public/image/post/${postid}.png}]`,
  //         ),
  //       },
  //     },
  //   );
  //   const toModel2 = await this.httpService.axiosRef(
  //     'http://localhost:3000/predict-price',
  //     {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       data: {
  //         ratio_ripped: 0.5,
  //         ratio_worn_out: 0.5,
  //         price: 100000,
  //       },
  //     },
  //   );
}
