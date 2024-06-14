import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostingDto } from './dto/create-posting.dto';
import { UpdatePostingDto } from './dto/update-posting.dto';

@Injectable()
export class PostingService {
  private postings = [];

  create(createPostingDto: CreatePostingDto) {
    const newPosting = {
      id: this.postings.length + 1,
      ...createPostingDto,
    };
    this.postings.push(newPosting);
    return newPosting;
  }

  findAll() {
    return this.postings;
  }

  update(id: number, updatePostingDto: UpdatePostingDto) {
    const postingIndex = this.postings.findIndex((p) => p.id === id);
    if (postingIndex === -1) {
      throw new NotFoundException(`Posting with ID ${id} not found`);
    }
    const updatedPosting = {
      ...this.postings[postingIndex],
      ...updatePostingDto,
    };
    this.postings[postingIndex] = updatedPosting;
    return updatedPosting;
  }

  remove(id: number) {
    const postingIndex = this.postings.findIndex((p) => p.id === id);
    if (postingIndex === -1) {
      throw new NotFoundException(`Posting with ID ${id} not found`);
    }
    const deletedPosting = this.postings.splice(postingIndex, 1);
    return deletedPosting[0];
  }
}
