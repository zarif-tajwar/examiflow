import { Injectable } from '@nestjs/common';
import { GreetDto } from '@repo/shared-lib/validators/dtos/greet.dto';

@Injectable()
export class AppService {
  getHello(): string {
    const input: GreetDto = { greet: 'hello' };

    console.log(GreetDto.safeParse(input).success);

    return 'Hello World!';
  }
}
