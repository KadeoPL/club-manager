"use client";

import React, { useRef, useEffect } from "react";

const ArticleEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const quillInstance = useRef<any | null>(null);

  useEffect(() => {
    import("quill").then((QuillModule) => {
      const QuillClass: any = QuillModule.default;

      if (editorRef.current && !quillInstance.current) {
        const options = {
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["image", "code-block"],
            ],
          },
          theme: "snow",
          placeholder: "Napisz swój artykuł tutaj...",
        };

        quillInstance.current = new QuillClass(editorRef.current, options);
      }
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl">Tworzenie artykułu</h1>
      <div ref={editorRef} style={{ height: "300px" }} />
    </div>
  );
};

export default ArticleEditor;
