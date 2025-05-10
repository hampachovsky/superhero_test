import { paths } from '@/config'
import { createSuperheroSchema, useCreateSuperhero } from '@/services'
import type { SuperheroForm } from '@/types'
import { validateFiles } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

export const SuperheroFormPage: React.FC = () => {
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
			nickname: 'Superman',
			real_name: 'rwqtwqtwq',
			origin_description: 'rtwqtwqteqtrewdtqwetewqtewq',
			catch_phrase: 'tqewtqwetwq',
			superpowers: 'q, w, r',
		},
	})

	const navigate = useNavigate()
	const { create, isPending, isSuccess } = useCreateSuperhero()

	const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone()

	const onSubmit: SubmitHandler<SuperheroForm> = async (data) => {
		if (!validateFiles(acceptedFiles)) {
			toast.error('Invalid files, only JPG/PNG, size up to 5 MB')
			return
		}

		const formData = new FormData()

		formData.append('nickname', data.nickname)
		formData.append('real_name', data.real_name)
		formData.append('origin_description', data.origin_description)
		formData.append('superpowers', data.superpowers)
		formData.append('catch_phrase', data.catch_phrase)

		if (acceptedFiles) {
			acceptedFiles.forEach((file) => {
				formData.append('Images', file)
			})
		}

		create(formData)
	}

	useEffect(() => {
		if (isSuccess) {
			reset()
			navigate(paths.superheroes.path)
		}
	}, [isSuccess, reset, navigate])
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
				sx={{ border: '2px dashed', borderRadius: 2, p: 2, textAlign: 'center', height: '200px' }}
			>
				<input {...getInputProps()} />

				{isDragActive ? (
					<Typography variant='h5'>Drop the files here ...</Typography>
				) : (
					<Typography variant='h5'>Drag 'n' drop some files here, or click to select files</Typography>
				)}
			</Box>

			<Button loading={isPending} type='submit' variant='contained' color='primary' disabled={!isValid} sx={{ mt: 2 }}>
				Submit
			</Button>
		</Box>
	)
}
