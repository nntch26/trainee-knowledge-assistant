import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert 
                    prose-p:leading-relaxed prose-p:my-2 
                    prose-headings:font-semibold prose-headings:my-3
                    prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className, node, ref, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            
            return match ? (

              // ข้อความ code (code block)
              <div className="rounded-xl overflow-hidden my-4 border border-gray-200 dark:border-gray-700 shadow-sm bg-[#1E1E1E]">
                <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-xs text-gray-500 dark:text-gray-400 font-sans font-medium uppercase tracking-wider">
                  {match[1]}
                </div>
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  language={match[1]}
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '0.875rem' }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (

              // ข้อความ code ธรรมดา (inline code)
              <code
                {...rest}
                className="bg-gray-100 dark:bg-zinc-800 text-blue-600  px-1.5 py-0.5 rounded-md text-[0.85em] font-mono break-words"
              >
                {children}
              </code>
            );
          },
          table: ({node, ...props}) => (
            <div className="overflow-x-auto my-4 border rounded-lg dark:border-gray-700">
              <table className="w-full text-left border-collapse" {...props} />
            </div>
          ),
          th: ({node, ...props}) => <th className="bg-gray-100 dark:bg-zinc-800 p-3 border-b dark:border-gray-700 font-semibold text-sm" {...props} />,
          td: ({node, ...props}) => <td className="p-3 border-b dark:border-gray-700 last:border-0 text-sm" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}