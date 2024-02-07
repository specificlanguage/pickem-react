import { FaGithub, FaGlobe } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="bg-neutral-800 text-white pl-10 p-5 flex justify-between">
      <div className="space-y-2">
        <h1 className="text-xl">Pick'ems</h1>
        <p className="italic text-sm max-w-md">
          Disclaimer: This is not a sportsbetting website and no money should be
          spent here. This is a side project for the baseball community!
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex justify-end space-x-6">
          <a
            href="https://github.com/specificlanguage/pickem-react"
            target="_blank"
          >
            <FaGithub size={24} />
          </a>
          <a href="https://speclang.dev">
            <FaGlobe size={24} />
          </a>
        </div>
        <p className="italic text-sm">
          This site is not associated with MLB or any of its teams.
        </p>
        <p className="italic text-sm flex justify-end">
          © 2024{" "}
          <a className="ml-2" href="https://speclang.dev">
            specificlanguage
          </a>
        </p>
      </div>
    </div>
  );
}
