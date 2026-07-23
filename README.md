# Data Plus

![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.8.0-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-TODO-2496ED?logo=docker&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI%20Gateway-7C3AED)

Data Plus is an AI-powered dataset analysis platform built with Next.js. Users upload CSV files and the application automatically parses the dataset, detects column types and roles, generates charts, calculates statistical metadata, and produces AI-generated insights in Persian.

The project is designed to make exploratory data analysis accessible to users who do not need programming or data science experience, while still presenting a clean, professional interface for technical users, recruiters, and reviewers.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Analysis Pipeline](#analysis-pipeline)
- [AI Pipeline](#ai-pipeline)
- [Data Processing Pipeline](#data-processing-pipeline)
- [Supported Chart Types](#supported-chart-types)
- [Important Pages](#important-pages)
- [API Overview](#api-overview)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Performance Optimizations](#performance-optimizations)
- [Security](#security)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [Author](#author)

## Overview

Data Plus transforms CSV datasets into an interactive analysis experience:

1. Upload a CSV file.
2. Parse and preview the dataset.
3. Detect column types and semantic roles.
4. Compute statistical and quality metadata.
5. Generate chart candidates from the dataset.
6. Persist analysis results in PostgreSQL via Prisma.
7. Generate AI insights through OpenRouter.
8. Render everything inside a user dashboard with infinite chart loading.

The application uses Persian text in key user flows and AI output, which makes it suitable for Persian-speaking users while remaining readable for international technical audiences.

## Key Features

- CSV upload with client-side preview
- Automatic dataset analysis after upload
- Column type detection for numeric, boolean, date, text, category, temporal, and ID-like fields
- Semantic role mapping for dimensions, measures, temporals, and ignored columns
- Statistical analysis for numeric columns
- Data quality metrics such as completeness, cardinality, skewness, outlier detection, and data density
- Automatic chart candidate generation
- Supported visualization types: line, area, bar, pie, treemap, and scatter
- Dataset preview tables and column metadata tables
- Infinite loading for analysis charts
- User authentication with credentials login and email verification
- Analysis history with favorite and delete actions
- Real-time analysis status tracking: processing, completed, failed
- AI-generated insights in Persian
- Responsive UI for dashboard and public pages

## Technology Stack

The following stack is confirmed from `package.json` and the source code:

| Layer                | Technologies                                                    |
| -------------------- | --------------------------------------------------------------- |
| Framework            | Next.js 16.2.1, App Router                                      |
| UI                   | React 19.2.4, Tailwind CSS 4, HeroUI                            |
| Language             | TypeScript 5                                                    |
| Database             | PostgreSQL, Prisma 7.8.0, `@prisma/adapter-pg`                  |
| Authentication       | NextAuth 5 beta, Prisma Adapter, credentials provider           |
| AI                   | OpenRouter AI SDK provider, Vercel AI SDK                       |
| CSV Parsing          | Papa Parse                                                      |
| Visualization        | Recharts                                                        |
| Data Processing      | Arquero                                                         |
| Validation           | Zod                                                             |
| State / Server Cache | TanStack Query, React `useTransition`                           |
| Email                | Resend, React Email                                             |
| Utilities            | axios, bcryptjs, CryptoJS, zustand, next-themes, react-dropzone |
| Tooling              | ESLint, Prettier, pnpm                                          |

## Architecture

Data Plus follows a layered application architecture:

- **Frontend**: App Router pages and client components render the landing page, dashboard, upload flow, authentication pages, and analysis details.
- **Backend**: Server actions and route handlers process uploads, store analyses, fetch charts, and generate AI insights.
- **Database**: Prisma persists users, analyses, charts, insights, column metadata, and verification tokens in PostgreSQL.
- **AI Layer**: OpenRouter powers insight generation using structured JSON output validated by Zod.
- **Analysis Pipeline**: CSV parsing, type detection, statistical analysis, role mapping, chart generation, and persistence all happen during analysis execution.

### System Flow

```mermaid
flowchart TD
  A[CSV Upload] --> B[Dataset Parsing]
  B --> C[Metadata Extraction]
  C --> D[Statistics Calculation]
  D --> E[Column Type Detection]
  E --> F[Chart Candidate Generation]
  F --> G[AI Insight Generation]
  G --> H[Store Results]
  H --> I[Dashboard Rendering]
```

## Analysis Pipeline

The main analysis flow is implemented in `app/data/actions.ts` and related utilities.

### CSV Upload

The upload page accepts CSV files with a maximum size of 5 MB in the current UI.

### Dataset Parsing

- The file is read as text on the server.
- Papa Parse is used with `header: true`, `dynamicTyping: true`, and `skipEmptyLines: true`.
- A preview of the first 5 rows is stored in the database.

### Metadata Extraction

The analysis stores the dataset name, row count, column count, original file name, file size, and dataset preview.

### Statistics Calculation

For numeric columns, the analytics engine calculates mean, median, variance, standard deviation, skewness, kurtosis, min, max, range, quartiles, and IQR.

It also derives quality metrics such as completeness, cardinality ratio, outliers, skewness classification, normality heuristic, and density.

### Column Type Detection

The type detection layer infers whether each column is boolean, number, date, ID-like, text, category, or temporal. Heuristics also consider Persian keywords for temporal and categorical fields.

### Chart Candidate Generation

The chart generator scores combinations of columns to propose rectangular charts, trend charts, circular charts, scatter charts, and distribution charts.

### Persistence

Results are stored in Prisma models: `Analysis`, `Chart`, `Insight`, and `ColumnMetadata`.

## AI Pipeline

AI-powered insights are implemented in `app/api/ai/route.ts`.

### How AI is used

1. The client sends an analysis ID to the API route.
2. The server loads the analysis and its column metadata from Prisma.
3. A prompt is constructed from dataset context, row count, column count, and statistical metadata.
4. The model is instructed to return valid JSON only.
5. The response is validated against `insightSchema` from Zod.
6. Generated insights are persisted through the `addInsights` server action.

### OpenRouter integration

The API route uses `createOpenRouter` from `@openrouter/ai-sdk-provider` and streams the response through the Vercel AI SDK.

### Configured model routing

The code currently uses:

- Primary model: `tencent/hy3:free`
- Fallback / extra models:
  - `nvidia/nemotron-3-ultra-550b-a55b:free`
  - `nvidia/nemotron-3-super-120b-a12b:free`
  - `openai/gpt-oss-120b:free`

### Insight validation

Insight payloads are validated with Zod:

- 3 to 6 insights per response
- `TREND`, `INSIGHT`, `WARNING`, or `CORRELATION`
- title length max 80 characters
- description length max 280 characters
- score between 0.65 and 0.95

## Data Processing Pipeline

The dataset processing pipeline is built from a set of utility functions:

- **CSV parsing**: `papaparse`
- **Data cleaning**: empty rows are skipped during parsing
- **Missing values**: tracked during type detection and analytics calculations
- **Statistical calculations**: handled by `app/utils/analytics.ts`
- **Column role detection**: handled by `app/utils/type-detection.ts` and `app/utils/role-convertor.ts`
- **Chart generation**: handled by `app/utils/chart-candidate.ts` and `app/utils/chart-builder.ts`
- **Persistence**: handled through Prisma server actions

```mermaid
sequenceDiagram
  participant U as User
  participant UI as Upload UI
  participant SA as Server Action
  participant P as Parser / Analytics
  participant DB as PostgreSQL
  participant AI as OpenRouter
  participant D as Dashboard

  U->>UI: Upload CSV file
  UI->>SA: Submit file
  SA->>P: Parse and analyze dataset
  P->>DB: Save analysis, metadata, charts
  SA->>AI: Request insight generation
  AI-->>SA: Structured insight JSON
  SA->>DB: Save insights
  D->>DB: Load analysis details
  D-->>U: Render charts, preview, and metadata
```

## Supported Chart Types

| Chart Type     | When It Is Generated                                        |
| -------------- | ----------------------------------------------------------- |
| Line           | Temporal column + measure column                            |
| Area           | Temporal column + measure column                            |
| Bar            | Dimension + measure, or histogram-style distribution        |
| Horizontal Bar | TODO: not explicitly generated in the current chart builder |
| Pie            | Low-cardinality dimension distribution                      |
| Treemap        | Available as an alternative for rectangular charts          |
| Scatter        | Correlated numeric measure pairs                            |

The current chart builder returns supported `types` metadata for each chart card, and the analysis detail page renders them through a dynamic `ChartCard` component.

## Important Pages

### Landing Page

`app/page.tsx` composes the public homepage with header, hero, sample result, how-it-works, feature, visualization, use case, technical highlight, CTA, and footer sections.

### Dashboard

The dashboard area under `app/(pages)/dashboard/` contains the overview page, recent analyses, recent charts, recent insights, stats, settings, and upload flow.

### Upload Page

The upload experience includes file selection, dataset preview, analysis trigger, and a loading overlay during processing.

### Analysis Details

The analysis detail page shows analysis summary information, AI-generated insights, generated charts with infinite loading, dataset preview, and column metadata.

### User Analyses

The analyses section includes a list view, filtering, favorite toggling, and deletion actions.

### Authentication

Authentication includes signup, OTP email verification, credentials login, protected dashboard routes, profile update, password verification, and account deletion flows.

## API Overview

| Route                       | Method         | Purpose                                |
| --------------------------- | -------------- | -------------------------------------- |
| `/api/ai`                   | `POST`         | Generate AI insights for an analysis   |
| `/api/analyses/charts/[id]` | `GET`          | Fetch paginated charts for an analysis |
| `/api/auth/[...nextauth]`   | `GET` / `POST` | NextAuth handlers                      |

## Folder Structure

```text
app/
├── (pages)/                  # Route groups for app pages
│   ├── dashboard/            # Authenticated dashboard pages
│   ├── login/                # Login page
│   ├── signup/               # Signup page
│   └── verify-email/         # OTP verification page
├── api/                      # Route handlers
├── components/               # Reusable UI and page components
├── constants/                # Shared constants
├── data/                     # Server actions and validation schemas
├── hooks/                    # Custom React hooks
├── lib/                      # Prisma, auth, encryption, and client utilities
└── utils/                    # Analysis, charting, formatting, and type logic

prisma/
├── schema.prisma             # Database schema
└── migrations/               # Prisma migration history

public/                       # Static assets
```

| Folder           | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| `app/(pages)`    | Route groups for public and authenticated sections          |
| `app/api`        | API routes for charts, AI generation, and authentication    |
| `app/components` | Shared UI primitives and page-level components              |
| `app/data`       | Server actions, schemas, and data interfaces                |
| `app/lib`        | Prisma client, NextAuth config, and encryption helpers      |
| `app/utils`      | Dataset analytics, chart generation, and formatting helpers |
| `prisma`         | Prisma schema and migration files                           |
| `public`         | Static images and icons                                     |

## Installation

### Prerequisites

- Node.js 20+ recommended
- pnpm 11+
- PostgreSQL database
- OpenRouter API key
- Resend API key

### Clone the repository

```bash
git clone https://github.com/MHJ-10/data-plus.git
cd data-plus
```

### Install dependencies

```bash
pnpm install
```

### Configure environment variables

Create a `.env` file in the project root and set the required values listed below.

### Prisma setup

Generate the Prisma client:

```bash
pnpm prisma generate
```

Run database migrations:

```bash
pnpm prisma migrate deploy
```

For local development, you may also use:

```bash
pnpm prisma migrate dev
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
pnpm build
pnpm start
```

### Docker

TODO: A Dockerfile is not present in the repository at the moment.

### Docker Compose

TODO: A Docker Compose configuration is not present in the repository at the moment.

## Environment Variables

The following variables are referenced in the codebase:

| Variable             | Required | Used For                                         |
| -------------------- | -------- | ------------------------------------------------ |
| `DATABASE_URL`       | Yes      | Prisma PostgreSQL connection string              |
| `AUTH_SECRET`        | Yes      | NextAuth secret                                  |
| `SECRET_KEY`         | Yes      | AES encryption / decryption for signup flow data |
| `RESEND_API_KEY`     | Yes      | Sending OTP verification emails                  |
| `OPENROUTER_API_KEY` | Yes      | AI insight generation via OpenRouter             |

Example:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/data_plus"
AUTH_SECRET="your-auth-secret"
SECRET_KEY="your-secret-key"
RESEND_API_KEY="your-resend-api-key"
OPENROUTER_API_KEY="your-openrouter-api-key"
```

## Performance Optimizations

The codebase includes several performance-oriented techniques that are used in the implementation:

- **Dynamic imports**: chart rendering uses `next/dynamic` with `ssr: false`
- **Infinite queries**: chart pagination uses TanStack Query `useInfiniteQuery`
- **Lazy loading on scroll**: more charts are fetched when the observer reaches the bottom
- **Shared Prisma client**: the Prisma client is cached globally in development
- **Transitions**: `useTransition` is used for non-blocking UI updates during analysis and settings actions

TODO: Optimistic UI, Suspense-based data fetching, and custom image optimization were not confirmed in the inspected codebase.

## Security

The application implements several security mechanisms:

- Authentication via NextAuth credentials provider
- Route protection for dashboard pages through the proxy/auth layer
- Email verification before login is allowed
- Password hashing with bcryptjs
- Encrypted temporary signup payload using CryptoJS AES
- Input validation with Zod for signup and AI insight generation
- Ownership checks on analysis chart retrieval so users only access their own data

## Screenshots

<img width="1512" height="826" alt="Data Plus Landing Page" src="https://github.com/user-attachments/assets/2bdc1798-4353-4eb0-b43e-f94750fef18b" />

<img width="1258" height="827" alt="Data Plus Upload Page" src="https://github.com/user-attachments/assets/856503d0-90fe-4e6f-a7e9-cab751ef4a3f" />

<img width="1258" height="827" alt="Data Plus Dashboard Page" src="https://github.com/user-attachments/assets/d7d21e57-1b6b-48ed-b0e8-08cbd1ea5119" />

<img width="1247" height="765" alt="Data Plus Charts" src="https://github.com/user-attachments/assets/649f2651-b2c8-479d-a386-77f2f028741e" />

<img width="1245" height="628" alt="Data Plus Insights" src="https://github.com/user-attachments/assets/49fdd897-abf6-4ccf-a94c-7c7051a7aeb5" />

## Future Improvements

- Excel support
- More chart types
- Export PDF
- Team collaboration
- Scheduled analysis
- AI chat with dataset context
- Predictive analytics

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes with clear, focused commits.
4. Ensure the project builds and lints successfully.
5. Open a pull request with a concise description of the change.

Please follow the existing code style, folder structure, and analysis pipeline conventions.

## Author

**Mohammad Hossein Jafari**  
Frontend Developer  
[GitHub](https://github.com/MHJ-10)  
[LinkedIn](https://linkedin.com/in/mhj10)  
[Email](mailto:mhjafari.dev@gmail.com)
