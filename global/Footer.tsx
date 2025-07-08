// components/Footer.tsx
export default function Footer() {
    return (
      <footer className="mt-12 border-t pt-2 pb-4 px-4 text-center text-sm text-gray-600 bg-white">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-semibold text-[#089E5F] text-base">GreenOn Energy</p>
          <p className="max-w-m mx-aut">
            Empowering Nigerians with accurate Solar-Inverter recommendations and trusted vendor connections — one home at a time.
          </p>
          <p className="text-xs text-gray-400 mt-4">
            &copy; {new Date().getFullYear()} GreenOn Lab. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
  