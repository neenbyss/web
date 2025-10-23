import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SpotlightCard from '@/components/ui/spotlightcard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertIcon } from '@/icons/alert';
import { ArrowRightIcon } from '@/icons/arrow-right';
import { CheckIcon } from '@/icons/check';
import { CheckTaskIcon } from '@/icons/check-task';
import { DesignIcon } from '@/icons/design';
import { DiscordIcon } from '@/icons/discord';
import { FiveMIcon } from '@/icons/fivem';
import { WebsiteIcon } from '@/icons/website';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { plans } from './_plans';
import { PlansProduction } from './plans.production';
import { PlansDev } from './plans.dev';
import { Packs } from './plans.packs';
import { CTA } from './section.cta';
import { Kits } from './plans.kits';

export default function PlansPrices() {
  return (
    <section className='border-y'>
      <h2 className='sr-only'> Planes Generales </h2>
      <Tabs defaultValue='production'>
        <TabsList className='bg-content w-full justify-center'>
          <TabsTrigger value='production'>
            <h3 className='text-foreground text-xl font-medium'>Planes En Producción</h3>
          </TabsTrigger>
          <TabsTrigger value='dev'>
            <h3 className='text-foreground text-xl font-medium'>Pack Para Desarrollo</h3>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='production'>
          <PlansProduction />
        </TabsContent>
        <TabsContent value='dev'>
          <PlansDev />
        </TabsContent>
      </Tabs>
      <Kits />
      <Separator className='my-20' />
      <Packs />
      <CTA />
    </section>
  );
}
