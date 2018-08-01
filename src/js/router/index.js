define(["../templates/foo", "../templates/bar"], function(foo, bar) {
  const routes = [
    { path: '/foo', component: { template: foo } },
    { path: '/bar', component: { template: bar } }
  ]

  return new VueRouter({
    routes
  })
})
