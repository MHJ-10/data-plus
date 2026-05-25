-- CreateEnum
CREATE TYPE "AnalysisStatus" AS ENUM ('PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ColumnType" AS ENUM ('NUMBER', 'BOOLEAN', 'DATE', 'TEXT', 'CATEGORY', 'ID_LIKE');

-- CreateEnum
CREATE TYPE "ColumnRole" AS ENUM ('DIMENSION', 'MEASURE', 'TEMPORAL', 'IGNORE');

-- CreateEnum
CREATE TYPE "ChartCategory" AS ENUM ('RECTANGULAR', 'TREND', 'CIRCULAR', 'DISTRIBUTION');

-- CreateEnum
CREATE TYPE "ChartType" AS ENUM ('BAR', 'LINE', 'AREA', 'PIE', 'TREEMAP', 'SCATTER');

-- CreateEnum
CREATE TYPE "InsightType" AS ENUM ('TREND', 'INSIGHT', 'WARNING', 'CORRELATION');

-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "datasetName" TEXT NOT NULL,
    "rowsCount" INTEGER NOT NULL,
    "columnsCount" INTEGER NOT NULL,
    "status" "AnalysisStatus" NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "datasetPreview" JSONB,
    "originalFileName" TEXT,
    "originalFileSize" INTEGER,
    "analysisTimeMs" INTEGER,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chart" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "ChartCategory" NOT NULL,
    "defaultType" "ChartType" NOT NULL,
    "availableTypes" JSONB NOT NULL,
    "xField" TEXT,
    "yField" TEXT,
    "score" DOUBLE PRECISION,
    "chartData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insight" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "InsightType" NOT NULL,
    "score" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColumnMetadata" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "columnName" TEXT NOT NULL,
    "type" "ColumnType" NOT NULL,
    "role" "ColumnRole" NOT NULL,
    "missingCount" INTEGER NOT NULL,
    "uniqueCount" INTEGER NOT NULL,
    "uniqueRatio" DOUBLE PRECISION,
    "averageLength" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ColumnMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Analysis_userId_idx" ON "Analysis"("userId");

-- CreateIndex
CREATE INDEX "Analysis_createdAt_idx" ON "Analysis"("createdAt");

-- CreateIndex
CREATE INDEX "Chart_analysisId_idx" ON "Chart"("analysisId");

-- CreateIndex
CREATE INDEX "Insight_analysisId_idx" ON "Insight"("analysisId");

-- CreateIndex
CREATE INDEX "ColumnMetadata_analysisId_idx" ON "ColumnMetadata"("analysisId");

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insight" ADD CONSTRAINT "Insight_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColumnMetadata" ADD CONSTRAINT "ColumnMetadata_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
