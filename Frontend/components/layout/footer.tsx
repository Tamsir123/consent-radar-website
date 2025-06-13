export default function Footer() {
  return (
    <footer className="bg-navy-900 dark:bg-navy-950 text-white py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/logo.jpeg" alt="ClairContrat" width={40} height={40} className="rounded-lg" />
                <span className="font-bold text-xl">ClairContrat</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                L'intelligence artificielle qui démystifie vos contrats numériques pour vous protéger des clauses
                cachées.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produit</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="/chat" className="hover:text-brand-400 transition-colors">
                    Analyser un contrat
                  </a>
                </li>
                <li>
                  <a href="/resumes-populaires" className="hover:text-brand-400 transition-colors">
                    Résumés populaires
                  </a>
                </li>
                <li>
                  <a href="/tarifs" className="hover:text-brand-400 transition-colors">
                    Tarifs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Ressources</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="/blog" className="hover:text-brand-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/guide" className="hover:text-brand-400 transition-colors">
                    Guide d'utilisation
                  </a>
                </li>
                <li>
                  <a href="/support" className="hover:text-brand-400 transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="/a-propos" className="hover:text-brand-400 transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="/confidentialite" className="hover:text-brand-400 transition-colors">
                    Confidentialité
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-brand-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-navy-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 ClairContrat. Tous droits réservés. Protégez vos droits numériques.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
