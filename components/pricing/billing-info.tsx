import * as React from "react";
import Link from "next/link";

import { UserSubscriptionPlan } from "types";
import { cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerPortalButton } from "@/components/forms/customer-portal-button";

interface BillingInfoProps extends React.HTMLAttributes<HTMLFormElement> {
  userSubscriptionPlan: UserSubscriptionPlan;
}

export function BillingInfo({ userSubscriptionPlan }: BillingInfoProps) {
  const {
    title,
    description,
    stripeCustomerId,
    isPaid,
    isCanceled,
    stripeCurrentPeriodEnd,
  } = userSubscriptionPlan;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan souscris</CardTitle>
        <CardDescription>
          Tu es actuellement sur le <strong>{title}</strong> plan.
        </CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="flex flex-col items-center space-y-2 border-t bg-accent py-2 md:flex-row md:justify-between md:space-y-0">
        {isPaid ? (
          <p className="text-sm font-medium text-muted-foreground">
            {isCanceled
              ? "Ton abonnement sera annulé le "
              : "Ton plan se renouvellera le "}
            {formatDate(stripeCurrentPeriodEnd)}.
          </p>
        ) : null}

        {isPaid && stripeCustomerId ? (
          <CustomerPortalButton userStripeId={stripeCustomerId} />
        ) : (
          <Link href="/pricing" className={cn(buttonVariants())}>
            Choisi un plan
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
