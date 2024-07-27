import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Social from './social';
import Image from 'next/image';

interface CardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  children: React.ReactNode;
}

const CardWrapper = ({
  headerLabel,
  backButtonLabel,
  backButtonHref,
  children,
}: CardWrapperProps) => {
  return (
    <div className="w-[400px]">
      <Image
        height={35}
        width={168}
        src="/petfind-logo.png"
        alt="PetFind Logo"
        className="mx-auto mb-6"
        priority
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{headerLabel}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <div className="relative w-full py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
        </CardFooter>
        <CardFooter>
          {' '}
          <Social />
        </CardFooter>
        <CardFooter>
          <Button variant="link" className="w-full" asChild>
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardWrapper;
