import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateReferralCode } from '../utils/jwt.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding de la base de données...');

  try {
    // Nettoyer les données existantes
    console.log('🧹 Nettoyage des données existantes...');
    await prisma.ticketMessage.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.referral.deleteMany();
    await prisma.subscription.deleteMany();
    await prisma.plan.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();

    // Créer les utilisateurs
    console.log('👥 Création des utilisateurs...');
    const hashedPassword = await bcrypt.hash('password123', 12);

    const admin = await prisma.user.create({
      data: {
        email: 'admin@arnaudschaeffer.com',
        password: hashedPassword,
        firstName: 'Arnaud',
        lastName: 'Schaeffer',
        role: 'ADMIN'
      }
    });

    const user1 = await prisma.user.create({
      data: {
        email: 'client1@example.com',
        password: hashedPassword,
        firstName: 'Jean',
        lastName: 'Dupont',
        role: 'USER'
      }
    });

    const user2 = await prisma.user.create({
      data: {
        email: 'client2@example.com',
        password: hashedPassword,
        firstName: 'Marie',
        lastName: 'Martin',
        role: 'USER'
      }
    });

    const user3 = await prisma.user.create({
      data: {
        email: 'client3@example.com',
        password: hashedPassword,
        firstName: 'Pierre',
        lastName: 'Durand',
        role: 'USER',
        referredBy: user1.id
      }
    });

    console.log('✅ Utilisateurs créés:', { admin: admin.email, user1: user1.email, user2: user2.email, user3: user3.email });

    // Créer les plans d'abonnement
    console.log('📋 Création des plans d\'abonnement...');
    const basicPlan = await prisma.plan.create({
      data: {
        name: 'Plan Basique',
        description: 'Accès aux fonctionnalités de base',
        price: 9.99,
        duration: 'MONTHLY',
        features: [
          'Support par email',
          'Accès aux ressources de base',
          'Mises à jour mensuelles'
        ],
        isActive: true
      }
    });

    const proPlan = await prisma.plan.create({
      data: {
        name: 'Plan Pro',
        description: 'Toutes les fonctionnalités avancées',
        price: 29.99,
        duration: 'MONTHLY',
        features: [
          'Support prioritaire',
          'Accès à toutes les ressources',
          'Mises à jour en temps réel',
          'Consultation personnalisée',
          'Accès aux webinaires exclusifs'
        ],
        isActive: true
      }
    });

    const lifetimePlan = await prisma.plan.create({
      data: {
        name: 'Plan Lifetime',
        description: 'Accès à vie à toutes les fonctionnalités',
        price: 299.99,
        duration: 'LIFETIME',
        features: [
          'Accès à vie',
          'Support prioritaire à vie',
          'Toutes les fonctionnalités',
          'Consultations illimitées',
          'Accès aux futures fonctionnalités'
        ],
        isActive: true
      }
    });

    console.log('✅ Plans créés:', { basic: basicPlan.name, pro: proPlan.name, lifetime: lifetimePlan.name });

    // Créer des abonnements
    console.log('📅 Création des abonnements...');
    const subscription1 = await prisma.subscription.create({
      data: {
        userId: user1.id,
        planId: proPlan.id,
        status: 'ACTIVE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    });

    const subscription2 = await prisma.subscription.create({
      data: {
        userId: user2.id,
        planId: basicPlan.id,
        status: 'ACTIVE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    });

    console.log('✅ Abonnements créés');

    // Créer des produits
    console.log('🛍️ Création des produits...');
    const product1 = await prisma.product.create({
      data: {
        name: 'Formation React Avancée',
        description: 'Formation complète sur React avec hooks, context et patterns avancés',
        price: 199.99,
        category: 'Formation',
        images: [
          'https://example.com/react-formation.jpg'
        ],
        isActive: true
      }
    });

    const product2 = await prisma.product.create({
      data: {
        name: 'Consultation 1h',
        description: 'Consultation personnalisée d\'une heure sur votre projet',
        price: 150.00,
        category: 'Consultation',
        images: [
          'https://example.com/consultation.jpg'
        ],
        isActive: true
      }
    });

    const product3 = await prisma.product.create({
      data: {
        name: 'Template E-commerce',
        description: 'Template complet pour site e-commerce avec React et Node.js',
        price: 99.99,
        category: 'Template',
        images: [
          'https://example.com/ecommerce-template.jpg'
        ],
        isActive: true
      }
    });

    console.log('✅ Produits créés:', { product1: product1.name, product2: product2.name, product3: product3.name });

    // Créer des commandes
    console.log('🛒 Création des commandes...');
    const order1 = await prisma.order.create({
      data: {
        userId: user1.id,
        totalAmount: 199.99,
        status: 'CONFIRMED',
        shippingAddress: {
          street: '123 Rue de la Paix',
          city: 'Paris',
          postalCode: '75001',
          country: 'France'
        },
        paidAt: new Date(),
        items: {
          create: [
            {
              productId: product1.id,
              quantity: 1,
              price: 199.99,
              total: 199.99
            }
          ]
        }
      }
    });

    const order2 = await prisma.order.create({
      data: {
        userId: user2.id,
        totalAmount: 249.99,
        status: 'SHIPPED',
        shippingAddress: {
          street: '456 Avenue des Champs',
          city: 'Lyon',
          postalCode: '69001',
          country: 'France'
        },
        paidAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Il y a 2 jours
        items: {
          create: [
            {
              productId: product2.id,
              quantity: 1,
              price: 150.00,
              total: 150.00
            },
            {
              productId: product3.id,
              quantity: 1,
              price: 99.99,
              total: 99.99
            }
          ]
        }
      }
    });

    console.log('✅ Commandes créées');

    // Créer des codes de parrainage
    console.log('🎯 Création des codes de parrainage...');
    const referralCode1 = await generateReferralCode();
    const referral1 = await prisma.referral.create({
      data: {
        referrerId: user1.id,
        code: referralCode1,
        commissionRate: 0.1,
        status: 'PENDING'
      }
    });

    const referralCode2 = await generateReferralCode();
    const referral2 = await prisma.referral.create({
      data: {
        referrerId: user1.id,
        referredUserId: user3.id,
        code: referralCode2,
        commissionRate: 0.1,
        status: 'COMPLETED',
        completedAt: new Date(),
        commissionAmount: 10.00
      }
    });

    console.log('✅ Codes de parrainage créés:', { code1: referralCode1, code2: referralCode2 });

    // Créer des tickets de support
    console.log('🎫 Création des tickets de support...');
    const ticket1 = await prisma.ticket.create({
      data: {
        userId: user1.id,
        subject: 'Problème avec la formation React',
        description: 'Je n\'arrive pas à accéder au module 3 de la formation React avancée.',
        status: 'OPEN',
        priority: 'MEDIUM',
        category: 'Technique',
        messages: {
          create: [
            {
              userId: user1.id,
              content: 'Je n\'arrive pas à accéder au module 3 de la formation React avancée. Pouvez-vous m\'aider ?',
              isFromAdmin: false
            }
          ]
        }
      }
    });

    const ticket2 = await prisma.ticket.create({
      data: {
        userId: user2.id,
        subject: 'Question sur la facturation',
        description: 'J\'aimerais changer mon plan d\'abonnement.',
        status: 'IN_PROGRESS',
        priority: 'LOW',
        category: 'Facturation',
        assignedToId: admin.id,
        messages: {
          create: [
            {
              userId: user2.id,
              content: 'J\'aimerais passer du plan basique au plan pro. Comment faire ?',
              isFromAdmin: false
            },
            {
              userId: admin.id,
              content: 'Bonjour Marie, je vais vous aider avec le changement de plan. Vous pouvez le faire directement depuis votre espace membre.',
              isFromAdmin: true
            }
          ]
        }
      }
    });

    const ticket3 = await prisma.ticket.create({
      data: {
        userId: user3.id,
        subject: 'Félicitations pour le contenu !',
        description: 'Excellent travail sur les formations, très utiles !',
        status: 'CLOSED',
        priority: 'LOW',
        category: 'Feedback',
        closedAt: new Date(),
        messages: {
          create: [
            {
              userId: user3.id,
              content: 'Excellent travail sur les formations, très utiles ! Merci beaucoup.',
              isFromAdmin: false
            },
            {
              userId: admin.id,
              content: 'Merci beaucoup Pierre pour ce retour positif ! N\'hésitez pas si vous avez des questions.',
              isFromAdmin: true
            }
          ]
        }
      }
    });

    console.log('✅ Tickets créés:', { ticket1: ticket1.subject, ticket2: ticket2.subject, ticket3: ticket3.subject });

    console.log('🎉 Seeding terminé avec succès !');
    console.log('\n📊 Résumé des données créées:');
    console.log(`- ${await prisma.user.count()} utilisateurs`);
    console.log(`- ${await prisma.plan.count()} plans d'abonnement`);
    console.log(`- ${await prisma.subscription.count()} abonnements`);
    console.log(`- ${await prisma.product.count()} produits`);
    console.log(`- ${await prisma.order.count()} commandes`);
    console.log(`- ${await prisma.referral.count()} parrainages`);
    console.log(`- ${await prisma.ticket.count()} tickets`);
    console.log(`- ${await prisma.ticketMessage.count()} messages de tickets`);

    console.log('\n🔑 Comptes de test:');
    console.log('Admin: admin@arnaudschaeffer.com / password123');
    console.log('Client 1: client1@example.com / password123');
    console.log('Client 2: client2@example.com / password123');
    console.log('Client 3: client3@example.com / password123');

  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });