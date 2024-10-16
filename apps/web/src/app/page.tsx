import { GreetDto } from '@repo/shared-lib/validators/dtos/greet.dto';
import { Button } from '@repo/ui/components/ui/button';
import React from 'react';

const RootPage = () => {
  const input: GreetDto = { greet: 'hello' };

  console.log(GreetDto.safeParse(input).success);

  return (
    <div>
      <Button size={'lg'}>Click Me</Button>
    </div>
  );
};

export default RootPage;
