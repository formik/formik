import * as React from 'react';
import { Banner } from 'components/Banner';
import { Sticky } from 'components/Sticky';
import { Nav } from 'components/Nav';

import { siteConfig } from 'siteConfig';
import Link from 'next/link';
import { Footer } from 'components/Footer';
import { ClientsMarquee } from 'components/clients/ClientsMarquee';
import { Seo } from 'components/Seo';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import cn from 'classnames';

const inter = Inter({ subsets: ['latin'] });
export interface HomeProps {}

const Home: React.FC<HomeProps> = props => {
  return (
    <>
      <Seo
        title="Formik"
        description="React hooks and components for hassle-free form validation. The world's leading companies use Formik to build forms and surveys in React and React Native."
      />
      <Head>
        <title>Formik: Build forms in React, without the tears</title>
      </Head>
      <div className={cn('bg-gray-50 h-full min-h-full', inter.className)}>
        <Banner />
        <Sticky>
          <Nav />
        </Sticky>
        <div className="relative overflow-hidden bg-white">
          <div className="hidden lg:block lg:absolute lg:inset-0">
            <svg
              className="absolute top-0 transform translate-x-64 -translate-y-8 left-1/2"
              width="640"
              height="784"
              fill="none"
              viewBox="0 0 640 784"
            >
              <defs>
                <pattern
                  id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
                  x="118"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                x="118"
                width="404"
                height="784"
                fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
              />
            </svg>
          </div>

          <div className="container relative px-4 py-24 mx-auto lg:px-0 sm:mt-12">
            <div className="hidden lg:block absolute lg:w-3/5 right-0 lg:-rotate-[30deg] lg:translate-x-1/3 lg:-translate-y-16 md:w-1/2 sm:w-2/3 top-0  transform  -translate-y-12">
              <Image
                alt="Formik Hero Background Image"
                src="/images/hero6.png"
                width={1042}
                height={990}
                priority={true}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className="lg:flex lg:max-w-md xl:max-w-xl lg:items-start lg:space-between lg:mx-4">
              <div className="">
                <div className="text-center lg:text-left md:max-w-2xl md:mx-auto ">
                  <h1 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                    Build forms in React,
                    <br className="hidden md:inline xl:hidden" />{' '}
                    <span>without the tears</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Formik is the world's most popular open source form library
                    for React and React Native.
                  </p>

                  <div className="mx-auto mt-5 sm:flex sm:justify-center lg:justify-start lg:mx-0 md:mt-8">
                    <div className="rounded-md shadow">
                      <Link
                        href="/docs/overview"
                        className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue md:py-4 md:text-lg md:px-10"
                      >
                        Get Started
                      </Link>
                    </div>
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                      <a
                        href={siteConfig.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-blue-600 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue md:py-4 md:text-lg md:px-10"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div />
            </div>
          </div>
        </div>
        <div className="text-lg border-t border-gray-100 bg-gray-50 lg:mx-4">
          <div className="py-24 ">
            <div className="container px-4 mx-auto lg:px-0">
              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                <div>
                  <div>
                    <h3 className="text-xl font-bold leading-6 text-gray-900 xl:text-2xl">
                      Declarative
                    </h3>
                    <p className="mt-2 text-base leading-6 text-gray-600 lg:mt-4 xl:text-lg lg:leading-normal">
                      Formik takes care of the repetitive and annoying
                      stuff—keeping track of values/errors/visited fields,
                      orchestrating validation, and handling submission—so you
                      don't have to. This means you spend less time wiring up
                      state and change handlers and more time focusing on your
                      business logic.
                    </p>
                  </div>
                </div>
                <div className="mt-10 lg:mt-0">
                  <div>
                    <h3 className="text-xl font-bold leading-6 text-gray-900 xl:text-2xl">
                      Intuitive
                    </h3>
                    <p className="mt-2 text-base leading-6 text-gray-600 lg:mt-4 xl:text-lg lg:leading-normal">
                      No fancy subscriptions or observables under the hood, just
                      plain React state and props. By staying within the core
                      React framework and away from magic, Formik makes
                      debugging, testing, and reasoning about your forms a
                      breeze. If you know React, and you know a bit about forms,
                      you know Formik!
                    </p>
                  </div>
                </div>
                <div className="mt-10 lg:mt-0">
                  <div>
                    <h3 className="text-xl font-bold leading-6 text-gray-900 xl:text-2xl">
                      Adoptable
                    </h3>
                    <p className="mt-2 text-base leading-6 text-gray-600 lg:mt-4 xl:text-lg lg:leading-normal">
                      Since form state is inherently local and ephemeral, Formik
                      does not use external state management libraries like
                      Redux or MobX. This also makes Formik easy to adopt
                      incrementally and keeps bundle size to a minimum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-6">
            <div className="text-sm font-semibold tracking-wider text-center text-gray-400 uppercase">
              Trusted in Production by
            </div>

            <ClientsMarquee />
          </div>
        </div>

        <div className="relative py-24 bg-gray-100 border-t border-gray-200 ">
          <div className="container max-w-3xl px-4 mx-auto sm:px-6 lg:px-8 sm:text-center">
            <h3 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 lg:leading-none">
              Less Code. Fewer Edge Cases.
            </h3>
            <p className="my-4 text-xl leading-7 text-gray-600">
              Formik comes with battle-tested solutions for input validation,
              formatting, masking, arrays, and error handling. This means you
              spend less time writing form code and more time building your next
              big thing.
            </p>
          </div>
          <div style={{ height: 224 }} />
        </div>

        <section className="bg-gray-900 body-font">
          <div className="container relative px-4 mx-auto max-w-7xl -mt-72">
            <iframe
              src="https://codesandbox.io/embed/dazzling-swanson-wne32?autoresize=1&codemirror=1&fontsize=14&hidenavigation=1&theme=dark"
              style={{
                width: '100%',
                height: '600px',
                border: '0',
                borderRadius: 8,
                overflow: 'hidden',
                position: 'static',
                zIndex: 0,
              }}
              className="shadow-2xl"
              title="dazzling-swanson-wne32"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            ></iframe>
          </div>
          <div className="container px-4 py-24 mx-auto sm:px-6 lg:px-8">
            <div className="pb-16 sm:text-center">
              <h3 className="mx-auto mt-2 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:leading-none">
                Battery-pack Included.
              </h3>
              <p className="max-w-3xl mx-auto mt-4 text-xl leading-7 text-gray-300">
                With Formik, not only is the battery-pack included, but you're
                taking advantage of our community's collective learnings in
                security, accessibility, and user experience research.
              </p>
            </div>
            <div>
              <div className="grid max-w-screen-lg grid-flow-row grid-cols-1 gap-4 mx-auto text-lg text-white sm:grid-cols-2 md:grid-cols-3">
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  Form-level Validation
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  Error Messages
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  Wizards and multi-step forms
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  Field-level validation
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  Array Fields
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  API Errors
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  Custom Validation
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  Internationalization (i18n)
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  Auto-saving forms
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  Dependent Validation
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  Conditional Logic
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  Dynamic Fields
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  React Native
                </a>
                <a className="mb-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 mr-2 text-blue-500 bg-blue-100 rounded-full">
                    <Check />
                  </span>
                  Tree shakeable
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="border-b border-gray-100 bg-gray-50">
          <div className="container px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              Ready to dive in?
            </h2>
            <div className="flex mt-8 lg:flex-shrink-0 lg:mt-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/docs/overview"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:ring"
                >
                  Get Started
                </Link>
              </div>
              <div className="inline-flex ml-3 rounded-md shadow">
                <a
                  href={siteConfig.repoUrl}
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-blue-600 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-blue-500 focus:outline-none focus:ring"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <style jsx global>{`
          .gradient {
            -webkit-mask-image: linear-gradient(
              180deg,
              transparent 0,
              #000 30px,
              #000 calc(100% - 200px),
              transparent calc(100% - 100px)
            );
          }
        `}</style>
      </div>
    </>
  );
};

export default Home;

Home.displayName = 'Home';

const Check = React.memo(() => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="3"
    className="w-3 h-3"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5"></path>
  </svg>
));
