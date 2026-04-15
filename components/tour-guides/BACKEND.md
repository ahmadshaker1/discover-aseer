# Tour Guides Registration Write Flow

This document describes how `/tour-guides/register` submits data as a real write operation.

## Runtime configuration

Use these environment variables:

- `DIRECTUS_WRITE_BASE_URL`: Directus base URL (no trailing slash).
- `DIRECTUS_WRITE_TOKEN`: server-side token used for write operations.
- `DIRECTUS_TOUR_GUIDE_APPLICATIONS_COLLECTION`: target collection for submissions.
- `DIRECTUS_TOUR_GUIDE_PROFILE_IMAGE_FIELD`: target field for profile image URL in collection.
- `DIRECTUS_TOUR_GUIDE_LICENSE_ATTACHMENT_FIELD`: target field for license attachment URL in collection.
- `TOUR_GUIDE_UPLOAD_MAX_MB`: max file size per uploaded file.

## API route

- Endpoint: `POST /api/tour-guides/register`
- File: `app/api/tour-guides/register/route.ts`
- Input: `multipart/form-data`

Expected fields:

- `name`, `name_en`, `gender`, `national_id`, `description`
- `license_number`, `date`
- `arabic_language_level`, `english_language_level`, `other_languages`
- `transportation`, `specializations`
- `email`, `phone_number`, `whatsapp`
- `website`, `instagram`, `x_platform`, `tiktok`
- `commitment_1`, `commitment_2`, `commitment_3`
- `profile_image` (file)
- `license_attachment` (file)

## Server-side flow

1. Validate required fields, commitments, and license date.
2. Upload profile image and license attachment to Directus `/files`.
3. Convert uploaded file IDs to public asset URLs.
4. Create one item directly in `tourist_guides`.

## Frontend submit point

- File: `components/tour-guides/TourGuideRegisterStepOneForm/TourGuideRegisterStepOneForm.tsx`
- Trigger: submit button at end of step one.
- UX states: loading, success, and error message.

## Notes

- The listing page (`/tour-guides`) remains independent from registration writes.
- Keep `DIRECTUS_WRITE_TOKEN` server-only; do not place it in `NEXT_PUBLIC_*` variables.
