import { Link } from 'react-router-dom';
export const Button = ({ variant = 'primary', size = 'md', href, className = '', children, ...props }) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2';
    const variants = {
        primary: 'bg-brand-green text-white hover:bg-brand-green-light shadow-md shadow-brand-green/25 hover:shadow-lg hover:shadow-brand-green/30 hover:-translate-y-0.5',
        secondary: 'bg-brand-dark text-white hover:bg-black shadow-md hover:shadow-lg hover:-translate-y-0.5',
        outline: 'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white',
        ghost: 'text-brand-green hover:bg-brand-green/10',
        white: 'bg-white text-brand-dark hover:bg-brand-offwhite shadow-md hover:-translate-y-0.5',
    };
    const sizes = {
        sm: 'min-h-10 px-4 py-2 text-sm',
        md: 'min-h-11 px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base',
        lg: 'min-h-12 w-full sm:w-auto px-6 py-3.5 text-base sm:px-8 sm:py-4 sm:text-lg',
    };
    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
    if (href) {
        const isExternal = /^(https?:|tel:|mailto:|wa\.me)/i.test(href) || href.startsWith('//');
        if (isExternal) {
            return (<a href={href} className={classes}>
          {children}
        </a>);
        }
        return (<Link to={href} className={classes}>
        {children}
      </Link>);
    }
    return (<button className={classes} {...props}>
      {children}
    </button>);
};
