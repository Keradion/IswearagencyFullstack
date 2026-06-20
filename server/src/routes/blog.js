import express from 'express';
import BlogPost from '../models/BlogPost.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// ── PUBLIC ROUTES ────────────────────────────────────────────────────────────

/**
 * GET /api/blog
 * List all PUBLISHED posts (with pagination)
 * Query params: page=1, limit=9
 */
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 9);
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      BlogPost.find({ published: true })
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-content') // Exclude full content from list view
        .lean(),
      BlogPost.countDocuments({ published: true }),
    ]);

    res.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('Get posts error:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

/**
 * GET /api/blog/:slug
 * Single post by slug (public, only if published)
 */
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      slug: req.params.slug,
      published: true,
    }).lean();

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json({ post });
  } catch (err) {
    console.error('Get post error:', err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// ── ADMIN ROUTES (JWT required) ───────────────────────────────────────────────

/**
 * GET /api/blog/admin/all
 * List ALL posts (published + drafts) — admin only
 */
router.get('/admin/all', requireAuth, requireAdmin, async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .select('-content')
      .lean();

    res.json({ posts });
  } catch (err) {
    console.error('Admin get all posts error:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

/**
 * GET /api/blog/admin/:id
 * Get a single post by ID (for editing) — admin only
 */
router.get('/admin/id/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).lean();
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ post });
  } catch (err) {
    console.error('Admin get post error:', err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

/**
 * POST /api/blog
 * Create a new blog post — admin only
 */
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, author, tags, published } = req.body;

    const post = new BlogPost({
      title,
      excerpt,
      content,
      coverImage: coverImage || '',
      author: author || 'I Swear Agency',
      tags: tags || [],
      published: published || false,
    });

    await post.save();

    res.status(201).json({
      message: 'Blog post created successfully',
      post,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    console.error('Create post error:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

/**
 * PUT /api/blog/:id
 * Update a blog post — admin only
 */
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, author, tags, published } = req.body;

    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Update fields
    if (title !== undefined) post.title = title;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (content !== undefined) post.content = content;
    if (coverImage !== undefined) post.coverImage = coverImage;
    if (author !== undefined) post.author = author;
    if (tags !== undefined) post.tags = tags;
    if (published !== undefined) post.published = published;

    await post.save();

    res.json({
      message: 'Blog post updated successfully',
      post,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    console.error('Update post error:', err);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

/**
 * DELETE /api/blog/:id
 * Delete a blog post — admin only
 */
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    console.error('Delete post error:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

/**
 * PATCH /api/blog/:id/publish
 * Toggle publish status — admin only
 */
router.patch('/:id/publish', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { published } = req.body;
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.published = published;
    await post.save();

    res.json({
      message: `Post ${published ? 'published' : 'unpublished'} successfully`,
      post,
    });
  } catch (err) {
    console.error('Toggle publish error:', err);
    res.status(500).json({ error: 'Failed to update publish status' });
  }
});

export default router;
