import { Body, Controller, Post } from '@nestjs/common';
import { ZodPipe } from 'src/config/zod-pipe.config';
import { CreateProfileDto } from '@repo/shared-lib/validators/dtos/users/profiles/create-profile.dto';
import { ProfileService } from './profile.service';

@Controller('users/profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  createProfile(@Body(new ZodPipe(CreateProfileDto)) body: CreateProfileDto) {
    return this.profileService.createProfile(body);
  }
}
