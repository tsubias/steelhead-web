import ReactMarkdown from "react-markdown";
import LegalLayout from "./LegalLayout";
import "../../styles/legal.css";

export default function MarkdownPage({ content, title }) {
  return (
    <LegalLayout title={title}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </LegalLayout>
  );
}
