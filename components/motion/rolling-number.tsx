const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

type RollingNumberProps = {
  /** Texte à afficher, par exemple "290 €" : seuls les chiffres roulent. */
  value: string;
  className?: string;
};

/**
 * Affiche une valeur dont chaque chiffre roule (comme un compteur mécanique)
 * quand elle change. Composant sans état : la transition CSS fait le travail.
 * À placer dans un élément avec `leading-none` pour un alignement parfait.
 */
export function RollingNumber({ value, className = '' }: RollingNumberProps) {
  return (
    <span className={`roll ${className}`}>
      <span className="sr-only">{value}</span>
      {Array.from(value).map((char, index) =>
        /\d/.test(char) ? (
          <span key={index} className="roll-digit" aria-hidden="true">
            <span className="roll-col" style={{ transform: `translateY(-${Number(char) * 10}%)` }}>
              {digits.map((digit) => (
                <span key={digit}>{digit}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={index} className="roll-static" aria-hidden="true">
            {char === ' ' ? '\u00a0' : char}
          </span>
        ),
      )}
    </span>
  );
}
