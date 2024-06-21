import { PrismaClient } from '@prisma/client';

export async function seedCommon(prisma: PrismaClient) {
  const frequentlyAskedQuestion = [
    {
      question: 'Apa itu aplikasi BacaLagi?',
      answer:
        'Aplikasi BacaLagi merupakan platform jual beli buku bekas sekaligus memprediksi harga buku berdasarkan kondisi buku yang diunggah.',
    },
    {
      question: 'Apa saja fitur yang tersedia di aplikasi ini?',
      answer:
        'Pencarian buku berdasarkan judul, pengarang, atau kategori. Posting buku untuk dijual dengan informasi lengkap dan foto cover. Melihat detail buku seperti judul, harga, lokasi, dan foto cover. Diskusi dengan penjual maupun pembeli melalui WhatsApp. Rekomendasi harga berdasarkan foto cover buku. Edit profil.',
    },
    {
      question: 'Bagaimana cara memposting buku untuk dijual?',
      answer:
        'Anda dapat memasukkan informasi seperti judul, pengarang, tahun terbit, dan mengunggah foto cover buku pada menu Post. Pastikan foto yang diunggah jelas dan merupakan foto cover depan buku.',
    },
    {
      question: 'Bagaimana aplikasi menentukan rekomendasi harga buku?',
      answer:
        'Aplikasi menggunakan machine learning untuk menganalisis foto cover buku yang diunggah dan memberikan rekomendasi harga berdasarkan kondisi dan informasi lainnya.',
    },
    {
      question: 'Apakah saya harus mengikuti rekomendasi harga dari aplikasi?',
      answer:
        'Tidak, Anda dapat memilih untuk mengikuti rekomendasi harga atau menetapkan harga sendiri.',
    },
    {
      question: 'Apakah data pribadi saya aman?',
      answer:
        'Ya, kami sangat menjaga privasi dan keamanan data pribadi Anda. Silakan lihat kebijakan privasi kami untuk informasi lebih lanjut.',
    },
  ];

  const privacyPolicy = [
    {
      title: 'Pengumpulan Informasi',
      content:
        'Kami mengumpulkan informasi pribadi saat Anda mendaftar dan menggunakan aplikasi kami. Informasi ini termasuk nomor telepon, provinsi, dan data pribadi lainnya yang diperlukan untuk menyediakan layanan yang lebih baik.',
    },
    {
      title: 'Penggunaan Informasi',
      content:
        'Informasi pribadi yang kami kumpulkan digunakan untuk mengelola akun Anda, memberikan layanan yang Anda minta, berkomunikasi dengan Anda, dan meningkatkan pengalaman Anda dalam menggunakan aplikasi kami.',
    },
    {
      title: 'Keamanan Informasi',
      content:
        'Kami berkomitmen untuk melindungi informasi pribadi Anda. Kami menerapkan berbagai langkah keamanan untuk menjaga kerahasiaan dan integritas data Anda.',
    },
    {
      title: 'Berbagi Informasi',
      content:
        'Kami tidak akan membagikan informasi pribadi Anda kepada pihak ketiga tanpa izin Anda, kecuali jika diwajibkan oleh hukum atau untuk melindungi hak kami.',
    },
    {
      title: 'Integrasi dengan WhatsApp',
      content:
        'Aplikasi kami terintegrasi dengan WhatsApp untuk memfasilitasi komunikasi antara pembeli dan penjual. Informasi kontak Anda mungkin digunakan untuk memulai percakapan melalui WhatsApp.',
    },
    {
      title: 'Pilihan Pengguna',
      content:
        'Anda dapat memilih untuk tidak menggunakan rekomendasi harga dari aplikasi kami dan menetapkan harga sendiri. Anda juga dapat mengatur preferensi privasi Anda melalui pengaturan akun.',
    },
    {
      title: 'Perubahan Kebijakan Privasi',
      content:
        'Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan kebijakan akan diberitahukan melalui aplikasi kami atau melalui email.',
    },
    {
      title: 'Kontak Kami',
      content:
        'Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan privasi ini, silakan hubungi kami melalui helpdesk.',
    },
  ];

  for await (const faq of frequentlyAskedQuestion) {
    const data = await prisma.frequentlyAskedQuestion.create({
      data: faq,
    });
    console.log(`Created FAQ with id: ${data.id}`);
  }

  for await (const policy of privacyPolicy) {
    const data = await prisma.privacyPolicy.create({
      data: policy,
    });
    console.log(`Created Privacy Policy with id: ${data.id}`);
  }

  console.log('Common seeded');
}
