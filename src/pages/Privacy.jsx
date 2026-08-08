import privacyContent from "../markdown/privacy.md?raw";
import MarkdownPage from "../components/legal/MarkdownPage";

export default function Privacy() {
  return <MarkdownPage title="Privacy Policy" content={privacyContent} />;
}
