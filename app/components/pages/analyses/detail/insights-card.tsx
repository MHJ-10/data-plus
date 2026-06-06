import { Insight, InsightType } from "@/generated/prisma/client";
import { Card, ScrollShadow } from "@heroui/react";
import { AlertTriangleIcon, LightbulbIcon, TrendingUpIcon } from "lucide-react";
import React from "react";

const generatedInsights = `{
  "insights": [
    {
      "title": "Cholesterol Outliers Signal Potential Data Quality or Clinical Urgency",
      "description": "Three patients (1.5%) exhibit cholesterol levels exceeding 339 mg/dL, far above the mean of 212 mg/dL and median of 211 mg/dL. These extreme values may indicate familial hypercholesterolemia, measurement errors, or acute conditions requiring immediate clinical review. The dedicated 'smoking - cholesterol_mg_dl' and 'disease - cholesterol_mg_dl' charts enable direct assessment of whether these outliers correlate with smoking status or disease presence.",
      "type": "WARNING",
      "score": 0.85
    },
    {
      "title": "Age Distribution Skews Older, Impacting Disease Prevalence Interpretation",
      "description": "The cohort median age (56) exceeds the mean (53.2), with a negative skew of -0.23 and an interquartile range of 34–70 years. This left-skewed distribution indicates a concentration of older patients, which naturally elevates disease prevalence and confounds risk factor analysis. The 'disease - age' and 'smoking - age' charts allow stratification to disentangle age effects from other predictors.",
      "type": "INSIGHT",
      "score": 0.75
    },
    {
      "title": "Blood Pressure Outliers Reach Hypertensive Crisis Levels",
      "description": "Systolic BP shows 3 outliers (1.5%) with a maximum of 195 mmHg, while diastolic BP has 4 outliers (2%) reaching 111 mmHg. These values meet criteria for hypertensive urgency/emergency and warrant clinical validation. The 'disease - systolic_bp', 'disease - diastolic_bp', and 'smoking - systolic_bp' charts facilitate evaluation of whether these extremes associate with disease status or smoking.",
      "type": "WARNING",
      "score": 0.8
    },
    {
      "title": "Physical Activity's Three Categories Enable Dose-Response Analysis",
      "description": "Physical activity is recorded as a three-level categorical variable, with corresponding charts against seven health metrics (age, diastolic BP, cholesterol, heart rate, glucose, systolic BP, BMI). This granularity supports investigation of graded relationships—e.g., whether moderate activity confers intermediate benefits compared to low/high levels—across cardiovascular and metabolic indicators.",
      "type": "INSIGHT",
      "score": 0.7
    },
    {
      "title": "Smoking Status Shows Broad Associations Across Key Risk Factors",
      "description": "Seven rectangular charts directly compare smoking (boolean) against cholesterol, systolic/diastolic BP, glucose, age, heart rate, and BMI. This comprehensive coverage allows simultaneous assessment of smoking's multivariate impact. Given smoking's established pathophysiology, these visualizations can quantify effect sizes and identify which biomarkers show the strongest divergence between smokers and non-smokers.",
      "type": "CORRELATION",
      "score": 0.9
    },
    {
      "title": "Family History Charts Enable Genetic Risk Profiling Across Metrics",
      "description": "Family history (boolean) is plotted against seven continuous variables: cholesterol, diastolic BP, heart rate, glucose, BMI, age, and systolic BP. This breadth permits evaluation of hereditary influence on each trait independently and in combination. Cross-referencing with the 'disease' charts can reveal whether family history amplifies disease risk through specific pathways (e.g., lipid metabolism vs. blood pressure regulation).",
      "type": "CORRELATION",
      "score": 0.85
    },
    {
      "title": "Gender-Stratified Charts Reveal Sex-Specific Physiological Patterns",
      "description": "Gender (two categories) is compared against seven measures: age, heart rate, cholesterol, diastolic BP, BMI, systolic BP, and glucose. With balanced representation implied by the data, these charts can uncover clinically relevant sex differences—such as higher systolic BP in men or distinct glucose distributions—that should inform sex-aware risk modeling and intervention thresholds.",
      "type": "TREND",
      "score": 0.8
    },
    {
      "title": "Glucose Minimum of 34 mg/dL Indicates Severe Hypoglycemia Cases",
      "description": "The glucose distribution spans 34–182 mg/dL with a mean of 104.4 mg/dL and only 2 outliers (1%). The minimum value of 34 mg/dL represents profound, potentially life-threatening hypoglycemia that demands verification for data entry errors or clinical emergencies (e.g., insulin overdose). The 'disease - glucose_mg_dl' and 'alcohol_consumption - glucose_mg_dl' charts help contextualize these extremes.",
      "type": "WARNING",
      "score": 0.75
    }
  ]
}`;

const generatedPersianInsights = [
  {
    title: "مقادیر غیرعادی کلسترول شناسایی شد",
    description:
      "سه بیمار دارای سطح کلسترول بسیار بالاتر از محدوده معمول هستند. این مقادیر می‌توانند نشانه مشکلات بالینی جدی یا خطاهای ثبت داده باشند و نیاز به بررسی بیشتر دارند.",
    type: "WARNING",
    score: 0.85,
  },
  {
    title: "توزیع سنی به سمت افراد مسن متمایل است",
    description:
      "بیشتر افراد حاضر در مجموعه داده در گروه‌های سنی بالاتر قرار دارند. این موضوع می‌تواند بر نرخ بروز بیماری و تحلیل سایر عوامل خطر تأثیر بگذارد.",
    type: "INSIGHT",
    score: 0.75,
  },
  {
    title: "فشار خون‌های بسیار بالا مشاهده شد",
    description:
      "چند نمونه دارای فشار خون سیستولیک و دیاستولیک بسیار بالاتر از محدوده طبیعی هستند که ممکن است نشان‌دهنده شرایط پزشکی پرخطر باشد.",
    type: "WARNING",
    score: 0.8,
  },
  {
    title: "امکان تحلیل تأثیر فعالیت بدنی وجود دارد",
    description:
      "داده‌های فعالیت بدنی در سه سطح مختلف ثبت شده‌اند و امکان بررسی ارتباط آن با شاخص‌های سلامت و متابولیک را فراهم می‌کنند.",
    type: "INSIGHT",
    score: 0.7,
  },
  {
    title: "سیگار با چندین عامل خطر مرتبط است",
    description:
      "وضعیت مصرف سیگار با شاخص‌هایی مانند کلسترول، فشار خون، قند خون، ضربان قلب و BMI مقایسه شده و امکان بررسی اثرات آن را فراهم می‌کند.",
    type: "CORRELATION",
    score: 0.9,
  },
  {
    title: "سابقه خانوادگی می‌تواند عامل مهمی باشد",
    description:
      "داده‌ها امکان بررسی تأثیر سابقه خانوادگی بر شاخص‌هایی مانند کلسترول، فشار خون، قند خون و BMI را فراهم می‌کنند.",
    type: "CORRELATION",
    score: 0.85,
  },
  {
    title: "الگوهای متفاوت بین زنان و مردان قابل بررسی است",
    description:
      "مقایسه جنسیت با شاخص‌های مختلف سلامت می‌تواند تفاوت‌های فیزیولوژیکی و عوامل خطر مرتبط با هر گروه را آشکار کند.",
    type: "TREND",
    score: 0.8,
  },
  {
    title: "مقادیر بسیار پایین قند خون شناسایی شد",
    description:
      "حداقل مقدار ثبت‌شده قند خون بسیار پایین است و ممکن است نشان‌دهنده شرایط پزشکی خاص یا خطا در ثبت داده باشد.",
    type: "WARNING",
    score: 0.75,
  },
] as  Insight[];

const insightTypeMap: Record<
  InsightType,
  { icon: React.ReactNode; color: string }
> = {
  INSIGHT: {
    icon: <LightbulbIcon />,
    color: "from-blue-500 to-blue-600",
  },
  CORRELATION: {
    icon: <TrendingUpIcon />,
    color: "from-purple-500 to-purple-600",
  },
  TREND: {
    icon: <TrendingUpIcon />,
    color: "from-green-500 to-green-600",
  },
  WARNING: {
    icon: <AlertTriangleIcon />,
    color: "from-orange-500 to-orange-600",
  },
};

export const InsightsCard = () => {
  const insights = JSON.parse(generatedInsights).insights as Insight[];

  return (
    <Card className="border bg-transparent">
      <Card.Header className="mb-4 text-2xl font-bold">
        تحلیل‌های هوشمند
      </Card.Header>
      <Card.Content className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-4">
        {generatedPersianInsights.map((insight) => (
          <Card key={insight.title} variant="tertiary" className="p-5">
            <div className="flex items-start gap-3">
              <div
                className={`text-background rounded-xl bg-linear-to-r p-2 ${insightTypeMap[insight.type].color}`}
              >
                {insightTypeMap[insight.type].icon}
              </div>
              <div className="flex-1">
                <h3 className="text-foreground text-xl font-semibold">
                  {insight.title}
                </h3>
                <ScrollShadow className="text-muted max-h-50 p-4 text-lg">
                  {insight.description}
                </ScrollShadow>
              </div>
            </div>
          </Card>
        ))}
      </Card.Content>
    </Card>
  );
};
