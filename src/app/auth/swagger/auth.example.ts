export class AuthExample {
  static postAuth = {
    isRegistered: true,
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNseDkwdDIxdjAwMDBwem9nbTU2MTJ3bXMiLCJlbWFpbCI6ImExMjlkNGt5NDQ0OEBiYW5na2l0LmFjYWRlbXkiLCJpYXQiOjE3MTgwNTgwMzQsImV4cCI6MTcyMDY1MDAzNH0.XEsIu6PDs_LWkUUlD6KzaSSvYybJ3ozrCwZm61AY33g',
  };

  static postAuthRegister = {
    user: {
      id: 'clxhffgby00009aabl07fquec',
      profile: {
        id: 'clxhffgbz00029aabroc8lmjh',
        name: 'John Doe',
        avatarUrl:
          'https://storage.googleapis.com/bucket-storage-request/images/user/clxhffgby00009aabl07fquec/clxhffgby00009aabl07fquec.png',
        phoneNumber: '+6281234567890',
        adminAreaLocality: 'Jawa Timur',
        cityLocality: 'Kota Surabaya',
        address: 'Surabaya',
      },
      account: {
        id: 'clxhffgbz00019aabku2sdnax',
        email: 'johndoe@example.com',
        googleId: 'clxhffgbz00019aabku2sdnax',
      },
    },
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNseGQ3N3kwajAwMDM1eHlrZm9qZjhqNjMiLCJlbWFpbCI6ImExMjlkNGt5NDQ0OEBiYW5na2l0LmFjYWRlbXkiLCJpYXQiOjE3MTgyNzk0NTIsImV4cCI6MTcyMDg3MTQ1Mn0.4R_eJZ3ltHIMSFx0H47YOiuddhiNEPZS0b3x9PZMrKU',
  };

  static postAuthRegisterSomeFieldEmpty = {
    status: 'BadRequestException',
    statusCode: 400,
    message: 'Name is required',
  };
}
