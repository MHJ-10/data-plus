"use client";

import { Button } from "@heroui/react";

import { OpenRouter } from "@openrouter/sdk";

const DashboardPage = () => {
  const openRouter = new OpenRouter({
    apiKey:
      "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",
  });

  const handleScan = async () => {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen3.6-plus:free", // or any model from OpenRouter
          messages: [
            {
              role: "user",
              content: "Hello",
            },
          ],
        }),
      },
    );

    const answer = await response
      .json()
      .then((data) => data.choices[0].message.content);

    console.log(answer);
  };

  return (
    <div>
      DashboardPage
      <Button onClick={handleScan}>Scan</Button>
    </div>
  );
};

export default DashboardPage;
