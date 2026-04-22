'use client'

import { useState } from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import StatCard from '@/components/StatCard'
import ChatBubble from '@/components/ChatBubble'
import HeatmapGrid from '@/components/HeatmapGrid'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import PullQuote from '@/components/PullQuote'
import SplitBar from '@/components/SplitBar'
import Particles from '@/components/Particles'

export default function DevPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        <Particles />
      </div>

      {/* Header */}
      <header className="relative border-b border-border/40 backdrop-blur-sm bg-background/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground">
              Eight Months
            </h1>
            <p className="text-lg text-muted-foreground">
              Premium component showcase. A curated collection of beautifully crafted UI components for modern interfaces.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 border-b border-border/40">
            {['overview', 'components', 'patterns'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium capitalize transition-all border-b-2 ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-16 z-10">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-serif font-bold mb-8 text-foreground">Design Philosophy</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <PullQuote
                    quote="Elegance is not about being noticed, it's about being remembered."
                    sender="Giorgio Armani"
                  />
                </div>
                <Card className="md:col-span-2">
                  <CardContent>
                    <h3 className="text-xl font-serif font-semibold mb-4 text-foreground">Crafted for Excellence</h3>
                    <p className="text-muted-foreground mb-4">
                      Each component is carefully designed with attention to detail, ensuring a premium experience. From typography to spacing, every element serves a purpose.
                    </p>
                    <p className="text-muted-foreground">
                      These components demonstrate modern design principles combined with practical usability for contemporary web applications.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Stats Section */}
            <section>
              <h2 className="text-3xl font-serif font-bold mb-8 text-foreground">By The Numbers</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <StatCard
                  label="Components"
                  value={11}
                />
                <StatCard
                  label="Variations"
                  value={50}
                  suffix="+"
                />
                <StatCard
                  label="Customizable"
                  value={100}
                  suffix="%"
                />
                <StatCard
                  label="Performance"
                  value={98}
                />
              </div>
            </section>
          </div>
        )}

        {/* Components Tab */}
        {activeTab === 'components' && (
          <div className="space-y-16">
            {/* Badge Component */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-serif font-bold text-foreground">Badge</h3>
                <Badge variant="default">Component</Badge>
              </div>
              <Card>
                <CardContent className="flex flex-wrap gap-3 pt-6">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="greenFlag">Green Flag</Badge>
                  <Badge variant="yellowFlag">Yellow Flag</Badge>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Card Component */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-serif font-bold text-foreground">Card</h3>
                <Badge variant="secondary">Container</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Standard Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      A versatile container component for grouping related content with elevation and subtle shadows.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle>Highlighted Variant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Enhanced with accent colors for emphasis and visual hierarchy in your layouts.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            {/* Tooltip Component */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-serif font-bold text-foreground">Tooltip</h3>
                <Badge variant="default">Interactive</Badge>
              </div>
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg font-medium text-foreground cursor-help">
                        Hover here
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      Hover over me for details
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Chat Bubble Component */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-serif font-bold text-foreground">Chat Bubble</h3>
                <Badge variant="secondary">Message</Badge>
              </div>
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <ChatBubble
                    content="Hey, how are you doing today?"
                    sender="princess"
                  />
                  <ChatBubble
                    content="I'm doing great! Just admiring these beautiful components."
                    sender="vince"
                  />
                  <ChatBubble
                    content="They're perfect for modern web applications! ✨"
                    sender="princess"
                  />
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Skeleton Component */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-serif font-bold text-foreground">Skeleton</h3>
                <Badge variant="outline">Loading</Badge>
              </div>
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <Skeleton className="h-12 w-1/3 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-5/6 rounded" />
                  </div>
                  <Skeleton className="h-32 w-full rounded-lg" />
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Heatmap Component */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-serif font-bold text-foreground">Heatmap Grid</h3>
                <Badge variant="secondary">Data Viz</Badge>
              </div>
              <Card>
                <CardContent className="pt-6 overflow-x-auto">
                  <HeatmapGrid
                    cells={[8, 6, 7, 5, 4, 6, 3, 7, 8, 5, 4, 6, 7, 8, 5, 4, 6, 7, 8, 5]}
                    maxValue={8}
                    cellSize={32}
                  />
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Split Bar Component */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-serif font-bold text-foreground">Split Bar</h3>
                <Badge variant="secondary">Progress</Badge>
              </div>
              <Card>
                <CardContent className="space-y-6 pt-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Split Distribution</h4>
                    <SplitBar
                      leftPercent={40}
                      rightPercent={60}
                      leftLabel="Option A"
                      rightLabel="Option B"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Comparison View</h4>
                    <SplitBar
                      leftPercent={65}
                      rightPercent={35}
                      leftLabel="Preferred"
                      rightLabel="Alternative"
                    />
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {/* Patterns Tab */}
        {activeTab === 'patterns' && (
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-serif font-bold mb-8 text-foreground">Common Patterns</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pattern: Information Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Badge variant="default">Tip</Badge>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Combine cards with badges and typography for rich information displays.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pattern: Stats Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">1.2K</div>
                        <div className="text-xs text-muted-foreground">Active Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">94%</div>
                        <div className="text-xs text-muted-foreground">Satisfaction</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pattern: Badge Groups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Design</Badge>
                      <Badge variant="secondary">Components</Badge>
                      <Badge variant="secondary">UI Kit</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pattern: Loading State</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-4 w-full rounded" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-3xl font-serif font-bold mb-8 text-foreground">Best Practices</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <Badge variant="default">1</Badge>
                      <p className="text-muted-foreground">Use consistent spacing and typography across all components</p>
                    </li>
                    <li className="flex gap-3">
                      <Badge variant="default">2</Badge>
                      <p className="text-muted-foreground">Combine components thoughtfully for meaningful compositions</p>
                    </li>
                    <li className="flex gap-3">
                      <Badge variant="default">3</Badge>
                      <p className="text-muted-foreground">Maintain visual hierarchy through color and size variations</p>
                    </li>
                    <li className="flex gap-3">
                      <Badge variant="default">4</Badge>
                      <p className="text-muted-foreground">Test components across different screen sizes and contexts</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/40 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Eight Months — Premium Component Collection
            </p>
            <p className="text-sm text-muted-foreground">
              Crafted with attention to detail and modern design principles
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
