import { type AppType } from "next/app";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";
import { PageLayout } from "~/components";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Schitter</title>
        <meta name="description" content="Schit posting as easy as it gets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-center" />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
