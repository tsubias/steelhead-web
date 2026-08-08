import termsContent from "../markdown/terms.md?raw";
import MarkdownPage from "../components/legal/MarkdownPage";

export default function Terms() {
  return <MarkdownPage title="Terms of Use" content={termsContent} />;
}
