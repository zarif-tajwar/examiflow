import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from '@repo/shared-lib/validators/dtos/users/profiles/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor() {}

  createProfile(payload: CreateProfileDto) {
    console.log(payload, 'THE PAYLOAD');
  }
}
