# Tour Guides Registration Write Flow

This document describes how `/tour-guides/register` submits data as a real write operation.

## Runtime configuration

Use these environment variables:

- `DIRECTUS_WRITE_BASE_URL`: Directus base URL (no trailing slash).
- `DIRECTUS_WRITE_TOKEN`: server-side token used for write operations.
- `DIRECTUS_TOUR_GUIDE_APPLICATIONS_COLLECTION`: target collection for submissions.
- `DIRECTUS_TOUR_GUIDE_ANSWERS_FIELD`: field name used to store step-one answers.
- `DIRECTUS_TOUR_GUIDE_ATTACHMENTS_FIELD`: field name used to store uploaded file references.
- `DIRECTUS_TOUR_GUIDE_ATTACHMENTS_FORMAT`: `ids` or `m2m`.
- `TOUR_GUIDE_UPLOAD_MAX_MB`: max file size per uploaded file.
- `TOUR_GUIDE_UPLOAD_ALLOWED_MIME_TYPES`: comma-separated allowed MIME types.

## API route

- Endpoint: `POST /api/tour-guides/register`
- File: `app/api/tour-guides/register/route.ts`
- Input: `multipart/form-data`

Expected fields:

- `answers[]` (string, repeated): six required select answers from step one.
- `files` (file, repeated): one or more attachments.

## Server-side flow

1. Validate required answers and file constraints.
2. Upload each file to Directus `/files`.
3. Create one item in the applications collection.
4. Save answers and uploaded file IDs in configured fields.

## Frontend submit point

- File: `components/tour-guides/TourGuideRegisterStepOneForm/TourGuideRegisterStepOneForm.tsx`
- Trigger: submit button at end of step one.
- UX states: loading, success, and error message.

## Notes

- The listing page (`/tour-guides`) remains independent from registration writes.
- Keep `DIRECTUS_WRITE_TOKEN` server-only; do not place it in `NEXT_PUBLIC_*` variables.
