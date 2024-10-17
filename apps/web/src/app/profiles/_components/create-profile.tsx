'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProfileDto } from '@repo/shared-lib/validators/dtos/users/profiles/create-profile.dto';
import { Button } from '@repo/ui/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const CreateProfile = () => {
  const form = useForm<CreateProfileDto>({
    resolver: zodResolver(CreateProfileDto),
  });
  const { mutateAsync: createProfile, isSuccess } = useMutation({
    mutationFn: async (values: CreateProfileDto) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/users/profiles`,
          {
            method: 'POST',
            body: JSON.stringify(values),
          },
        );
        if (!res.ok) throw new Error(await res.text());
      } catch (err) {
        throw new Error((err as Error).message);
      }
    },
    onSuccess: () => {
      toast.success('Success');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = useCallback(
    async (values: CreateProfileDto) => {
      await createProfile(values);
    },
    [createProfile],
  );

  return (
    <div className="w-full max-w-xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-x-4 gap-y-8"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => {
              return (
                <FormItem className="grid gap-y-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => {
              return (
                <FormItem className="grid gap-y-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem className="grid gap-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="gpa"
            render={({ field }) => {
              return (
                <FormItem className="grid gap-y-1">
                  <FormLabel>GPA</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number.parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button
            type="submit"
            className="col-span-2"
            size={'lg'}
            disabled={isSuccess || form.formState.isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateProfile;
