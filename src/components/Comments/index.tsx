import { useColorMode } from "@docusaurus/theme-common";
import Giscus from "@giscus/react";

// https://rikublock.dev/docs/tutorials/giscus-integration/
export default function Comments(): JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <div className="docusaurus-mt-lg">
      <Giscus
        id="comments"
        repo="sagoo-cloud/sagooiot-doc"
        repoId="R_kgDOI59rNA"
        category="General"
        categoryId="DIC_kwDOI59rNM4CkY7V"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={colorMode === "dark" ? "dark_tritanopia" : "light_tritanopia"}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
