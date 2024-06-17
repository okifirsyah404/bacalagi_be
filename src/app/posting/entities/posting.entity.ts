import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Posting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  yearPublished: number;

  @Column()
  price: number;

  @Column({ nullable: true })
  imageUrl?: string; // Optional property for image URL
}
