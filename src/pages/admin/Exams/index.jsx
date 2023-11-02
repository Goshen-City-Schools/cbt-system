import ExamTable from "../../../components/admin/tables/ExamTable";
import PageSectionHeader from "../../../components/shared/PageSectionHeader";
import PageWrapper from "../../../components/shared/PageWrapper";

export default function ExamsPage() {
  return (
    <PageWrapper>
      <PageSectionHeader pageTitle={"All Exams"} pageCrumb={"Home / Exams"} />

      <ExamTable />
    </PageWrapper>
  );
}
