import { CoreMenu } from "@core/types";
import { SharedService } from 'app/components/Shared Servece/shared.service';
import { Component, OnInit } from '@angular/core';
 


export const VirticalMenu: CoreMenu[] = [
  // admin-home-section
  {
    id: "admin-home-section",
    title: "Admin Home",
    translate: "Admin Home",
    type: "item",
    icon: "home",
    url: "home",
  },
  // user-home-section
  {
    id: "user-home-section",
    type: "section",
    title: "Home Section",
    icon: "home",
    children: [
      {
        id: "user-Home",
        title: "User Home",
        type: "collapsible",
        icon: "box",
        children: [
          {
            id: "user-home-product",
            title: "User Home Product",
            type: "collapsible",
            icon: "box",
            children: [
              {
                id: "new-arrival",
                title: "New Arrival",
                type: "item",
                icon: "star",
                url: "new-arrival",
              },
              {
                id: "top-products",
                title: "Top Products",
                type: "item",
                icon: "award",
                url: "top-products",
              },
              {
                id: "new-discount",
                title: "Discount",
                type: "item",
                icon: "tag",
                url: "new-discount",
              },
            ],
          },
        ],
      },
    ],
  },
  // store-section
  {
    id: "store-section",
    type: "section",
    title: "Store Section",
    icon: "file-text",
    children: [
      {
        id: "all-store-requests",
        title: "All Stores and Req",
        type: "collapsible",
        icon: "shopping-bag",
        children: [
          {
            id: "all-stores",
            title: "View All Stores",
            type: "item",
            icon: "list",
            url: "view-all-stores",
          },
          {
            id: "new-stores-requests",
            title: "New Stores Requests",
            type: "item",
            icon: "user-plus",
            url: "new-stores-request",
          },
        ],
      },
    ],
  },
  // user-section 
  {
    id: "user-section",
    type: "section",
    title: "User Section",
    icon: "file-text",
    children: [
      {
        id: "user",
        title: "User",
        type: "collapsible",
        icon: "user",
        children: [
          {
            id: "all-user",
            title: "All Users",
            type: "item",
            icon: "user",
            url: "view-all-user",
          },
        ],
      },
    ],
  },
  // product-section
  {
    id: "product-section",
    type: "section",
    title: "Product Section",
    icon: "box",
    children: [
      {
        id: "products",
        title: "Product",
        type: "collapsible",
        icon: "box",
        children: [
          {
            id: "all-products",
            title: "All Products",
            type: "item",
            icon: "package",
            url: "view-all-products",
          },
          {
            id: "all-temp-products",
            title: "All Temp Products ",
            type: "item",
            icon: "package",
            url: "view-temp-products",
          },
        ],
      },
    ],
  },
  // orders-section
  {
    id: "orders-section",
    type: "section",
    title: "Orders Section",
    icon: "shopping-cart",
    children: [
      {
        id: "orders",
        title: "Orders",
        type: "collapsible",
        icon: "shopping-cart",
        children: [
          {
            id: "all-orders",
            title: "All Orders",
            type: "item",
            icon: "package",
            url: "view-all-orders",
          },
        ],
      },
    ],
  },
  // reviews-section
  {
    id: "reviews-section",
    type: "section",
    title: "Reviews Section",
    icon: "bar-chart-2",
    children: [
      {
        id: "Reviews",
        title: "Reviews",
        type: "collapsible",
        icon: "bar-chart-2",
        children: [
          {
            id: 'all-reviews',
            title: 'All Reviews',
            type: 'item',
            icon: 'package',
            url: 'all-reviews', // Matches the route path
          }
        ],
      },
    ]
  },
  // shipment-section
  {
    id: "shipment-section",
    type: "section",
    title: "Shipment Section",
    icon: "shopping-cart",
    children: [
      {
        id: "shipments",
        title: "Shipments",
        type: "collapsible",
        icon: "truck",
        children: [
          {
            id: "all-shipments",
            title: "All Shipments",
            type: "item",
            icon: "package",
            url: "view-all-shipments",
          },
        ],
      },
    ]
  },
  // category-subcategory-section
  {
    id: "category-subcategory-section",
    type: "section",
    title: "Category & Subcategory",
    icon: "file-text",
    children: [
      {
        id: "categories",
        title: "All Categories",
        type: "collapsible",
        icon: "airplay",
        children: [
          {
            id: "category",
            title: "Category",
            type: "item",
            icon: "columns",
            url: "view-all-category",
          },
          {
            id: "subcategory",
            title: "Subcategory",
            type: "item",
            icon: "columns",
            url: "view-all-subcategory",
          },
          {
            id: "SecondSubcategory",
            title: "Second Subcategory",
            type: "item",
            icon: "columns",
            url: "view-Second-Sub",
          },
          {
            id: "tags",
            title: "Tags",
            type: "item",
            icon: "tag",
            url: "view-all-tags",
          },
          {
            id: "feature",
            title: "Feature",
            type: "item",
            icon: "feather",
            url: "view-all-feature",
          },
        ],
      },
    ],
  },
  // problems-section
  {
    id: "problems-section",
    type: "section",
    title: "Problems Section",
    icon: "shopping-cart",
    children: [
      {
        id: "problems",
        title: "Problems",
        type: "collapsible",
        icon: "shopping-cart",
        children: [
          {
            id: "all-problems",
            title: "All Problems",
            type: "item",
            icon: "package",
            url: "view-all-problems",
          },
        ],
      },
    ],
  },
  // transactions-section
  {
    id: "transactions-section",
    type: "section",
    title: "Transactions Section",
    icon: "file-text",
    children: [
      {
        id: "transaction",
        title: "Transactions",
        type: "collapsible",
        icon: "file",
        children: [
          {
            id: "allTransactions",
            title: "All Transactions",
            type: "item",
            icon: "file-text",
            url: "/view-all-transactions",
          }
        ],
      },
    ],
  },
];

