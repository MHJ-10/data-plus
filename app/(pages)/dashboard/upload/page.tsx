"use client";

import { Uploader } from "@/components";
import { faqItems, uploadTips } from "@/components/pages/upload";
import { Accordion, Alert, Button, Card, Surface, toast } from "@heroui/react";
import axios from "axios";
import { ChevronDown, CircleQuestionMark, Info } from "lucide-react";
import { useState } from "react";

const UploadPage = () => {
  const [summary, setSummary] = useState();
  const [insights, setInsights] = useState([]);

  const onDropComplete = async (files: File[]) => {
    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSummary(res.data.summary);
    } catch (error) {
      console.log(error);
    }
  };

  const onAnalyze = async () => {
    try {
      const res = await axios.post("/api/insight", { summary });
      console.log(res.data);
      // setInsights(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Alert status="warning">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>نکات مهم پیش از آپلود فایل:</Alert.Title>
          <Alert.Description>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              {uploadTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </Alert.Description>
        </Alert.Content>
      </Alert>

      <div className="my-8 flex flex-col items-center justify-center gap-4">
        <Uploader
          className="w-full sm:w-150"
          onDrop={onDropComplete}
          options={{
            maxFiles: 1,
            maxSize: 10 * 1024 * 1024, // 10MB
            accept: {
              "text/csv": [".csv"],
            },
          }}
        />

        {summary ? (
          <Button onClick={onAnalyze} size="lg">
            شروع تحلیل
          </Button>
        ) : null}
      </div>

      {/* <div className="flex flex-row items-center justify-start gap-6">
        {insights.map((insight) => (
          <Card key={insight} variant="tertiary" className="text-end">
            {insight}
          </Card>
        ))}
      </div> */}

      <p className="mb-2 flex items-center gap-2 text-2xl font-bold">
        <CircleQuestionMark />
        سوالات متداول
      </p>
      <Accordion className="w-full" variant="surface">
        {faqItems.map((item, index) => (
          <Accordion.Item key={index}>
            <Accordion.Heading>
              <Accordion.Trigger>
                <Info className="text-warning me-2 size-4" />
                {item.title}
                <Accordion.Indicator className="">
                  <ChevronDown />
                </Accordion.Indicator>
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>{item.content}</Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default UploadPage;
