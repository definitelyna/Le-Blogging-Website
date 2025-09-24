// "use client";

// import { useState, ReactNode, useEffect } from "react";
// import Blog from "@/src/constants/blogInterface";
// import { cloneElement, isValidElement, Children } from "react";
// import { useRealtimeBlogs } from "@/src/hooks/useRealtimeBlogs";

// export default function ClientWrapper({ children }: { children: ReactNode }) {
//   const [displayBlogs, setDisplayBlogs] = useState<Blog[] | undefined>([]);
//   const { blogs } = useRealtimeBlogs();

//   useEffect(() => {
//     if (blogs && blogs.length > 0) {
//       const sortedBlogs = blogs.sort(
//         (a, b) => b.datePublished.getTime() - a.datePublished.getTime()
//       );
//       setDisplayBlogs(sortedBlogs);
//     } else {
//       setDisplayBlogs([]);
//     }
//   }, [blogs]);

//   // Clone children and inject props properly
//   const childrenWithProps = Children.map(children, (child, index) => {
//     if (isValidElement(child)) {
//       return cloneElement(child as any, {
//         allBlogs: blogs,
//         displayBlogs,
//         setDisplayBlogs,
//         key: index,
//       });
//     }
//     return child;
//   });

//   return <>{childrenWithProps}</>;
// }
