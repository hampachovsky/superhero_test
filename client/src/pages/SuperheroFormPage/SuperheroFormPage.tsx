import { paths } from '@/config';
import {
  createSuperheroSchema,
  useCreateSuperhero,
  useSuperhero,
  useUpdateSuperhero,
} from '@/services';
import type { SuperheroForm } from '@/types';
import { validateFiles } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router';

export const SuperheroFormPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { superhero, isPending: fetchSuperheroPending } = useSuperhero(
    searchParams.get('editId'),
  );
  const [existingImages, setExistingImages] = useState<string[] | undefined>();

  const navigate = useNavigate();
  const { create, isPending, isSuccess } = useCreateSuperhero();
  const {
    update,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
  } = useUpdateSuperhero();

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(createSuperheroSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      nickname: '',
      real_name: '',
      origin_description: '',
      catch_phrase: '',
      superpowers: '',
    },
  });

  useEffect(() => {
    if (!searchParams.get('editId')) {
      reset({
        nickname: '',
        real_name: '',
        origin_description: '',
        catch_phrase: '',
        superpowers: '',
      });
      setExistingImages([]);
      navigate(paths.superheroForm.path);
    } else if (superhero) {
      reset({
        nickname: superhero.nickname || '',
        real_name: superhero.real_name || '',
        origin_description: superhero.origin_description || '',
        catch_phrase: superhero.catch_phrase || '',
        superpowers: Array.isArray(superhero.superpowers)
          ? superhero.superpowers.join(', ')
          : superhero.superpowers || '',
      });
      setExistingImages(superhero.Images);
    }
  }, [superhero, reset, searchParams, navigate]);

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      reset();
      navigate(paths.superheroes.path);
    }
  }, [isSuccess, reset, navigate, isUpdateSuccess]);

  const handleRemoveExistingImage = (image: string) => {
    const filtredArr = existingImages?.filter((item) => item !== image);
    setExistingImages(filtredArr);
  };

  const onSubmit: SubmitHandler<SuperheroForm> = async (data) => {
    if (!validateFiles(acceptedFiles)) {
      toast.error('Invalid files, only JPG/PNG, size up to 5 MB');
      return;
    }

    const formData = new FormData();

    formData.append('nickname', data.nickname);
    formData.append('real_name', data.real_name);
    formData.append('origin_description', data.origin_description);
    formData.append('superpowers', data.superpowers);
    formData.append('catch_phrase', data.catch_phrase);

    if (acceptedFiles) {
      acceptedFiles.forEach((file) => {
        formData.append('Images', file);
      });
    }
    if (!superhero) {
      create(formData);
    } else {
      if (existingImages) {
        const formatedArr = existingImages.join(',');
        formData.append('existingImages', formatedArr);
      }
      console.log(formData);
      update({ superhero: formData, id: superhero._id });
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 5 }}
      component='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name='nickname'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Nickname'
            variant='outlined'
            error={!!errors.nickname}
            helperText={errors.nickname?.message}
            fullWidth
          />
        )}
      />
      <Controller
        name='real_name'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Real Name'
            variant='outlined'
            error={!!errors.real_name}
            helperText={errors.real_name?.message}
            fullWidth
          />
        )}
      />
      <Controller
        name='origin_description'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Origin description'
            multiline
            maxRows={4}
            variant='outlined'
            error={!!errors.origin_description}
            helperText={errors.origin_description?.message}
            fullWidth
          />
        )}
      />
      <Controller
        name='catch_phrase'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Catch phrase'
            variant='outlined'
            error={!!errors.catch_phrase}
            helperText={errors.catch_phrase?.message}
            fullWidth
          />
        )}
      />
      <Controller
        name='superpowers'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Super powers. Split by ,'
            variant='outlined'
            error={!!errors.superpowers}
            helperText={errors.superpowers?.message}
            fullWidth
          />
        )}
      />
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderRadius: 2,
          p: 2,
          textAlign: 'center',
          height: '200px',
        }}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <Typography variant='h5'>Drop the files here ...</Typography>
        ) : (
          <Typography variant='h5'>
            Drag 'n' drop some files here, or click to select files
          </Typography>
        )}
      </Box>
      {existingImages && superhero && existingImages.length > 0 ? (
        <List
          dense
          subheader={
            <Typography variant='h5' textAlign={'center'}>
              Images to remove
            </Typography>
          }
          sx={{ border: '2px dashed', borderRadius: 2, p: 2 }}
        >
          {existingImages.map((image, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  onClick={() => handleRemoveExistingImage(image)}
                  edge='end'
                  aria-label='delete'
                >
                  <CloseIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Box
                  component='img'
                  src={`${import.meta.env.VITE_STATIC_URL}${image}`}
                  alt={`${superhero.nickname} image ${index + 1}`}
                  sx={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />
              </ListItemAvatar>
            </ListItem>
          ))}
        </List>
      ) : null}
      <Button
        loading={isPending || isUpdatePending}
        type='submit'
        variant='contained'
        color='primary'
        disabled={!isValid}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};
