import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: Promise<{
    status: Status;
    orderBy: keyof Issue;
    sortOrder: "asc" | "desc";
    page: string;
  }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { lable: string; value: keyof Issue; className?: string }[] = [
    { lable: "Issue", value: "title" },
    { lable: "Status", value: "status", className: "hidden md:table-cell" },
    { lable: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const srcParams = await searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(srcParams.status)
    ? srcParams.status
    : undefined;
  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(srcParams.orderBy)
    ? { [srcParams.orderBy]: srcParams.sortOrder }
    : undefined;

  const toggleOrder = () => {
    return !srcParams.sortOrder || srcParams.sortOrder === "desc"
      ? "asc"
      : "desc";
  };

  const page = parseInt(srcParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...srcParams,
                      orderBy: column.value,
                      sortOrder: toggleOrder(),
                    },
                  }}
                >
                  {column.lable}
                </NextLink>
                {column.value === srcParams.orderBy &&
                  (srcParams.sortOrder === "asc" ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  ))}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
