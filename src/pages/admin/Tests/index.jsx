import ExamTable from "../../../components/admin/tables/ExamTable";
import PageSectionHeader from "../../../components/shared/PageSectionHeader";
import PageWrapper from "../../../components/shared/PageWrapper";

export default function TestsPage() {
  return (
    <PageWrapper>
      <PageSectionHeader pageTitle={"All Tests"} pageCrumb={"Home / Tests"} />

      <ExamTable />
    </PageWrapper>
  );
}
