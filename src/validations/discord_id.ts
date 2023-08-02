import * as Yup from 'yup';

export const discordID = Yup.object({
  discord_ID: Yup.string()
    .matches(new RegExp('^[0-9]+$'), 'Discord ID must be Number type')
    .min(3, 'Discord ID is too short')
    .max(28, 'Discord ID is too long')
    .required('Discord ID is required'),
});
