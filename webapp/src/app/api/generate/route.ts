import { NextResponse } from "next/server";
import { ModelServiceFactory } from "@/lib/models";
import { GenerateParams } from "@/lib/models/types";

export async function POST(req: Request) {
  try {
    const { content, source = "other", model = process.env.DEFAULT_MODEL || "gpt-4o-mini", temperature } = await req.json() as GenerateParams;

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // 根据模型ID获取对应的模型服务
    const modelService = ModelServiceFactory.getServiceByModelId(model);

    // 调用模型服务生成内容
    const result = await modelService.generate({
      content,
      source,
      model,
      temperature,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
