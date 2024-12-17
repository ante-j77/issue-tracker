import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import EditIssuePageClient from "./EditIssuePageClient";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!issue) notFound();

  return <EditIssuePageClient issue={issue} />;
};

export default EditIssuePage;
