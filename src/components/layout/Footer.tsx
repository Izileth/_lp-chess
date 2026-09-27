export default function Footer() {
    return (
        <footer className="w-full border-t border-black/5">
            <div className="max-w-6xl mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs opacity-60 text-[#17171a]">
                    &copy; 2026 Fallen King. Todos os direitos reservados.
                </p>
                <div className="flex items-center gap-6 text-xs font-medium tracking-wide opacity-70 text-[#17171a]">
                    <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
                    <a href="#" className="hover:opacity-100 transition-opacity">X</a>
                    <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}