import * as yup from 'yup'

export const createSuperheroSchema = yup.object({
	nickname: yup
		.string()
		.trim()
		.required('Nickname is required')
		.min(2, 'Nickname should be at least 2 characters')
		.max(50, 'Nickname should not exceed 50 characters'),

	real_name: yup
		.string()
		.trim()
		.required('Real name is required')
		.min(2, 'Real name should be at least 2 characters')
		.max(100, 'Real name should not exceed 100 characters'),

	origin_description: yup
		.string()
		.trim()
		.required('Origin description is required')
		.min(10, 'Origin description should be at least 10 characters')
		.max(1000, 'Origin description should not exceed 1000 characters'),

	catch_phrase: yup
		.string()
		.trim()
		.required('Catch phrase is required')
		.min(5, 'Catch phrase should be at least 5 characters')
		.max(200, 'Catch phrase should not exceed  200 characters'),

	superpowers: yup
		.string()
		.trim()
		.required('At least one superpower is required')
		.test(
			'min-superpowers',
			'Please provide at least one superpower',
			(value) => !!value && value.split(',').filter((item) => !!item.trim()).length > 0,
		),

	Images: yup.mixed(),
})
