import { useDoc } from "@docusaurus/plugin-content-docs/client";
import type { WrapperProps } from '@docusaurus/types';
import Comments from "@site/src/components/Comments";
import Paginator from '@theme-original/DocItem/Paginator';
import type PaginatorType from '@theme/DocItem/Paginator';
import React from 'react';


type Props = WrapperProps<typeof PaginatorType>;

export default function PaginatorWrapper(props: Props): JSX.Element {
  const { metadata } = useDoc();
  const { comments = true } = metadata.frontMatter;
  return (
    <>
      <Paginator {...props} />
      {comments && <Comments />}
    </>
  );
}
