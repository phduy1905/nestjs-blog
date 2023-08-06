import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dtos/updatePost.dto';
import { CreatePostDto } from './dtos/createPost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  getAllPosts() {
    return this.postsRepository.find();
  }

  getPostById(id: number) {
    const post = this.postsRepository.findOne({
      where: { id },
    });
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({
      where: {
        id,
      },
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async deletePost(id: number) {
    const deleteResposne = await this.postsRepository.delete(id);
    if (!deleteResposne) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
